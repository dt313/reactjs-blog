import { Fragment, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import DefaultLayout from './layout/DefaultLayout';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import { PiBellDuotone, PiBellRingingDuotone } from 'react-icons/pi';
import Avatar from './components/avatar';
import useOutsideClick from './hook/useOutsideClick';
const cx = classNames.bind(styles);

function App() {
    const [isRing, setIsRing] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const handleClickOutside = () => {
        if (notiRef.current) {
            setIsShow(false);
        }
    };

    const notiRef = useOutsideClick(handleClickOutside);
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
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>

                <div className={cx(isShow ? 'container' : 'bell')} ref={notiRef}>
                    {isShow && (
                        <div className={cx('header')}>
                            <h3 className={cx('title')}>Thông báo</h3>
                            <p className={cx('read-all')}>Đánh dấu đã đọc</p>
                        </div>
                    )}

                    <div className={cx('noti-list')}>
                        {isShow &&
                            [1, 2, 3, 4, 5, 6, 7].map((val, index) => {
                                return (
                                    <div className={cx('noti-item')} key={val}>
                                        <Avatar className={cx('avatar')} />
                                        <div className={cx('text-box')}>
                                            <p className={cx('content')}>Wuu. đã nhắc tới bạn trong một bình luận</p>
                                            <span className={cx('time')}>4 year ago</span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    {isRing ? (
                        <PiBellRingingDuotone
                            className={cx('icon')}
                            onClick={(e) => {
                                setIsShow(!isShow);
                            }}
                        />
                    ) : (
                        <PiBellDuotone className={cx('icon')} onClick={() => setIsShow(!isShow)} />
                    )}
                </div>
            </div>
        </Router>
    );
}

export default App;
