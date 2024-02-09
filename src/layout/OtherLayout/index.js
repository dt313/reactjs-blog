import Footer from '../components/footer';
import styles from './OtherLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function OtherLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default OtherLayout;
