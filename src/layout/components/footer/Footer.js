import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-inner')}>
                <div className={cx('footer-copyright')}>
                    <span className={cx('date')}>© 2023-09-27</span>
                    <span>
                        ::
                        <a
                            className={cx('name')}
                            href="https://www.facebook.com/profile.php?id=100015195702096"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Danh Tuan
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
