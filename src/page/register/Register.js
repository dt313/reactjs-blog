import { useState } from 'react';
import Button from '~/components/button/Button';
import { ImGithub, ImGoogle3, ImFacebook, ImMail } from 'react-icons/im';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { logout } from '~/redux/actions/authAction';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);

function Register() {
    const dispatch = useDispatch();
    const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);

    const [info, setInfo] = useState({
        email: '',
        pwd: '',
        cfpwd: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(info);

        // send data to server
        // test logout
        dispatch(logout());
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                Đăng Kí vào <span className={cx('logo')}>question.?</span>
            </h3>
            {isLoginWithEmail ? (
                <form className={cx('login-form')} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email" className={cx('login-label')}>
                        Email
                    </label>
                    <input
                        className={cx('login-input')}
                        name="email"
                        placeholder="abc@gmail.com"
                        value={info.email}
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="pwd" className={cx('login-label')}>
                        Password
                    </label>
                    <input
                        type="password"
                        className={cx('login-input')}
                        name="pwd"
                        placeholder="Abc12345@"
                        value={info.pwd}
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="cfpwd" className={cx('login-label')}>
                        Confirm password
                    </label>
                    <input
                        type="password"
                        placeholder="Abc12345@"
                        className={cx('login-input')}
                        name="cfpwd"
                        value={info.cfpwd}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button secondary className={cx('login-btn')}>
                        Đăng kí
                    </Button>
                </form>
            ) : (
                <div className={cx('content')}>
                    <div className={cx('login-box')}>
                        <Button secondary className={cx('btn')} leftIcon={<ImGoogle3 className={cx('icon')} />}>
                            Đăng kí với Google
                        </Button>
                        <Button secondary className={cx('btn')} leftIcon={<ImGithub className={cx('icon')} />}>
                            Đăng kí với Github
                        </Button>
                        <Button secondary className={cx('btn')} leftIcon={<ImFacebook className={cx('icon')} />}>
                            Đăng kí với Facebook
                        </Button>
                        <Button
                            secondary
                            className={cx('btn')}
                            leftIcon={<ImMail className={cx('icon')} />}
                            onClick={() => setIsLoginWithEmail(true)}
                        >
                            Đăng kí với Email
                        </Button>
                    </div>
                </div>
            )}

            <div className={cx('footer')}>
                <Button text className={cx('back')} to={'/'}>
                    Quay về trang chủ
                </Button>
                <Button text className={cx('back')} to={'/login'}>
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default Register;
