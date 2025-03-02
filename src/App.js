import { Fragment, Suspense, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PiBellDuotone, PiBellRingingDuotone } from 'react-icons/pi';
import DefaultLayout from './layout/DefaultLayout';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import { protectedRoutes, publicRoutes } from './routes/routes';
import useOutsideClick from './hook/useOutsideClick';
import { useDispatch, useSelector } from 'react-redux';
import ProtecedRoute from './routes/ProtectedRoute';
import Toast from './components/toast/Toast';
import ContinueLoader, { SpinnerLoader } from './components/loading/Loading';
import stompClient, { connect, disconnect } from './socket';
import { notificationService } from './services';
import {
    addNotification,
    initialNotifications,
    loadNotification,
    readAllNotification,
    readNotification,
} from './redux/actions/notificationAction';
import NotificationItem from './components/notificationItem/NotificationItem';
import Overlay from './components/overlay';
import ModelBox from './components/modelBox';
import { SHARE_MENU } from './config/uiConfig';
import ShareItem from './components/shareItem';
import { close } from './redux/actions/shareBoxAction';
import { addToast, createToast } from './redux/actions/toastAction';
import setError from '~/helper/setError';

const cx = classNames.bind(styles);

function App() {
    const dispatch = useDispatch();
    const [hasUnreadedNotification, setHasUnreadedNotification] = useState(false);
    const [isRing, setIsRing] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const [notiPage, setNotiPage] = useState(1);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const { userId, isAuthentication } = useSelector((state) => state.auth);
    const { notifications, countOfUnReaded, isEnd } = useSelector((state) => state.notification);
    const { isOpen, href } = useSelector((state) => state.shareBox);

    const { theme, primaryColor } = useSelector((state) => state.color);

    const handleClickOutside = () => {
        if (notiRef.current) {
            setIsShow(false);
        }
    };

    const notiRef = useOutsideClick(handleClickOutside);

    useEffect(() => {
        setHasUnreadedNotification(countOfUnReaded > 0);
        setIsRing(countOfUnReaded > 0);

        const timeout = setTimeout(() => {
            setIsRing(false);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [countOfUnReaded]);

    // fetch notifications from server
    const fetchNotificationAPI = async (page = 1) => {
        try {
            const result = await notificationService.getAllNotificationsByUser({
                id: userId,
                pageSize: 10,
                pageNumber: page,
            });
            dispatch(initialNotifications(result));
        } catch (error) {
            let err = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: err,
                    }),
                ),
            );
        }
    };

    // socket receive notification
    useEffect(() => {
        let timeout;
        if (isAuthentication) {
            stompClient.onConnect = () => {
                stompClient.subscribe('/user/ws/notification', (notification) => {
                    dispatch(addNotification(JSON.parse(notification.body)));
                    setHasUnreadedNotification(true);
                    setIsShow(true);
                    setIsRing(true);
                    timeout = setTimeout(() => {
                        setIsRing(false);
                    }, 5000);
                });
            };

            connect(userId);
            fetchNotificationAPI();
        } else {
            disconnect();
        }
        return () => {
            disconnect();
            clearTimeout(timeout);
        };
    }, [isAuthentication]);

    const handleReadAllNotification = async () => {
        try {
            await notificationService.readAllNotificationByUser(userId);
            dispatch(readAllNotification());
            setHasUnreadedNotification(false);
        } catch (error) {
            let err = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: err,
                    }),
                ),
            );
        }
    };

    const handleReadNotification = useCallback(async (is_readed, noti_id) => {
        try {
            setIsShow(false);
            if (is_readed === false) {
                await notificationService.readNotification(noti_id);
                dispatch(readNotification(noti_id));
            }
        } catch (error) {
            let err = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: err,
                    }),
                ),
            );
        }
    }, []);

    const handleScroll = async (e) => {
        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            setIsLoadMore(true);
            setNotiPage(notiPage + 1);
            try {
                const result = await notificationService.getAllNotificationsByUser({
                    id: userId,
                    pageSize: 10,
                    pageNumber: notiPage + 1,
                });

                dispatch(loadNotification(result));
            } catch (error) {
                let err = setError(error);
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: err,
                        }),
                    ),
                );
            } finally {
                setIsLoadMore(false);
            }
        }
    };

    return (
        <Router>
            <div className="App" data-theme={theme} data-primary-color={primaryColor}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        let Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Suspense fallback={<ContinueLoader />}>
                                            <Page />
                                        </Suspense>
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {protectedRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        let Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <ProtecedRoute>
                                            <Suspense fallback={<ContinueLoader />}>
                                                <Page />
                                            </Suspense>
                                        </ProtecedRoute>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>

                {isAuthentication && (
                    <div className={cx(isShow ? 'container' : 'bell')} ref={notiRef}>
                        {isShow && (
                            <div className={cx('header')}>
                                <h3 className={cx('title')}>Thông báo</h3>
                                <p className={cx('read-all')} onClick={handleReadAllNotification}>
                                    Đánh dấu đã đọc
                                </p>
                            </div>
                        )}

                        <div className={cx('noti-list')} onScroll={handleScroll}>
                            {isShow &&
                                notifications.map((notification, index) => {
                                    return (
                                        <NotificationItem
                                            key={notification.id}
                                            content={notification}
                                            onClick={handleReadNotification}
                                        ></NotificationItem>
                                    );
                                })}

                            {isLoadMore && !isEnd && isShow && (
                                <div className={cx('noti-loading')}>
                                    <SpinnerLoader small />
                                </div>
                            )}

                            {isEnd && isShow && <p className={cx('end-text')}>Đã hết thông báo</p>}
                        </div>

                        {hasUnreadedNotification ? (
                            <span
                                className={cx('bell-wrap')}
                                onClick={(e) => {
                                    setIsShow(!isShow);
                                }}
                            >
                                <PiBellRingingDuotone className={cx('icon', isRing && 'ring')} />
                            </span>
                        ) : (
                            <span
                                className={cx('bell-wrap')}
                                onClick={() => {
                                    setIsShow(!isShow);
                                }}
                            >
                                <PiBellDuotone className={cx('icon')} />
                            </span>
                        )}
                    </div>
                )}

                <Overlay state={isOpen} onClick={() => dispatch(close())}>
                    <ModelBox state={isOpen} title="Chia sẻ" onClose={() => dispatch(close())}>
                        <div className={cx('share-container')}>
                            {SHARE_MENU.map((item, index) => {
                                return (
                                    <ShareItem
                                        key={index}
                                        title={item.title}
                                        icon={item.icon}
                                        onClick={() => item.fn(href)}
                                    />
                                );
                            })}
                        </div>
                    </ModelBox>
                </Overlay>
                <Toast placement="top left" duration={5000} />
            </div>
        </Router>
    );
}

export default App;
