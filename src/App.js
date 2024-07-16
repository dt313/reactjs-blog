import { Fragment, Suspense, useEffect, useState, useRef } from 'react';
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
import ContinueLoader from './components/loading/Loading';
import stompClient, { connect, disconnect } from './socket';
import { notificationService } from './services';
import {
    addNotification,
    initialNotifications,
    readAllNotification,
    readNotification,
} from './redux/actions/notificationAction';
import NotificationItem from './components/notificationItem/NotificationItem';
const cx = classNames.bind(styles);

function App() {
    const dispatch = useDispatch();
    const [isRing, setIsRing] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const { userId, isAuthentication } = useSelector((state) => state.auth);
    const { notifications, countOfUnReaded } = useSelector((state) => state.notification);

    const handleClickOutside = () => {
        if (notiRef.current) {
            setIsShow(false);
        }
    };

    const notiRef = useOutsideClick(handleClickOutside);

    useEffect(() => {
        setIsRing(countOfUnReaded > 0);
    }, [countOfUnReaded]);
    // fetch notifications from server
    const fetchAPI = async () => {
        console.log('USER ID', userId);
        const result = await notificationService.getAllNotificationsByUser({
            id: userId,
            pageSize: 10,
            pageNumber: 1,
        });
        dispatch(initialNotifications(result));
    };

    console.log(notifications, countOfUnReaded, isRing);
    useEffect(() => {
        if (isAuthentication) {
            stompClient.onConnect = () => {
                console.log('connect server websocket ');
                stompClient.subscribe('/user/ws/notification', (notification) => {
                    console.log(notification);
                    dispatch(addNotification(JSON.parse(notification.body)));
                    setIsRing(true);
                });
            };
            connect();
            fetchAPI();
        } else {
            disconnect();
        }
        return () => {
            disconnect();
        };
    }, [isAuthentication]);

    const handleReadAllNotification = async () => {
        const result = await notificationService.readAllNotificationByUser(userId);
        if (result) {
            dispatch(readAllNotification());
            setIsRing(false);
        }
    };

    return (
        <Router>
            <div className="App">
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

                        <div className={cx('noti-list')}>
                            {isShow &&
                                notifications.map((notification, index) => {
                                    return (
                                        <NotificationItem
                                            key={notification.id}
                                            content={notification}
                                            onClick={async () => {
                                                setIsShow(false);
                                                if (notification.is_readed === false) {
                                                    const result = await notificationService.readNotification(
                                                        notification.id,
                                                    );
                                                    dispatch(readNotification(notification.id));
                                                }
                                            }}
                                        ></NotificationItem>
                                    );
                                })}
                        </div>

                        {isRing ? (
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
                                    // console.log('bell');
                                    // sendMessage();
                                    setIsShow(!isShow);
                                }}
                            >
                                <PiBellDuotone className={cx('icon')} />
                            </span>
                        )}
                    </div>
                )}
            </div>

            <Toast placement="top left" duration={5000} />
        </Router>
    );
}

export default App;
