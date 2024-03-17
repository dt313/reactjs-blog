import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Header from '~/layout/components/header';
import Footer from '~/layout/components/footer';
import { PiBellDuotone, PiBellRingingDuotone } from 'react-icons/pi';
import Avatar from '~/components/avatar';
import { useState } from 'react';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [isRing, setIsRing] = useState(false);
    const [isShow, setIsShow] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
