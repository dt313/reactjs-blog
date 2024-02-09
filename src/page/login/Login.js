import Button from '~/components/button/Button';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { ImGithub, ImGoogle3, ImFacebook } from 'react-icons/im';
const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h3 className={cx('title')}>
                    Đăng nhập vào <span className={cx('logo')}>question.?</span>
                </h3>
                <div className={cx('login-box')}>
                    <Button secondary className={cx('btn')} leftIcon={<ImGoogle3 className={cx('icon')} />}>
                        Đăng nhập với Google
                    </Button>
                    <Button secondary className={cx('btn')} leftIcon={<ImGithub className={cx('icon')} />}>
                        Đăng nhập với Github
                    </Button>
                    <Button secondary className={cx('btn')} leftIcon={<ImFacebook className={cx('icon')} />}>
                        Đăng nhập với Facebook
                    </Button>
                </div>

                <Button text className={cx('back')} to={'/'}>
                    Quay về trang chủ
                </Button>
            </div>
        </div>
    );
}

export default Login;
