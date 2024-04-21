import { useState } from 'react';
import Button from '~/components/button/Button';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { ImGithub, ImGoogle3, ImFacebook, ImMail } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/actions/authAction';
import { useSearchParams, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Login() {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let prePath = '';
    if (searchParams.size > 0) {
        prePath = searchParams.get('continue');
    }

    const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);
    const [info, setInfo] = useState({
        email: '',
        pwd: '',
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
        // fetch api to recveive token
        // store token to session
        dispath(
            login({
                accessToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbmggVHVhbiIsImFnZSI6MTIsInVzZXJpZCI6IjEiLCJhdmF0YXIiOiJpbWciLCJpYXQiOjE1MTYyMzkwMjJ9.5z2JFMWsUrBYPlUiGyP-dyivkfIJHmn13vJJVvSuAUE',
                refreshToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbmggVHVhbiIsImFnZSI6MTIsInVzZXJpZCI6IjEiLCJhdmF0YXIiOiJpbWciLCJpYXQiOjE1MTYyMzkwMjJ9.5z2JFMWsUrBYPlUiGyP-dyivkfIJHmn13vJJVvSuAUE',
                data: {
                    username: 'Danh Tuan',
                    id: '2',
                },
            }),
        );

        navigate(prePath);
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                Đăng nhập vào <span className={cx('logo')}>question.?</span>
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
                    <Button secondary className={cx('login-btn')}>
                        Đăng nhập
                    </Button>
                </form>
            ) : (
                <div className={cx('content')}>
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
                        <Button
                            secondary
                            className={cx('btn')}
                            leftIcon={<ImMail className={cx('icon')} />}
                            onClick={() => setIsLoginWithEmail(true)}
                        >
                            Đăng nhập với Email
                        </Button>
                    </div>
                </div>
            )}

            <div className={cx('footer')}>
                <Button text className={cx('back')} to={'/'}>
                    Quay về trang chủ
                </Button>
                <Button text className={cx('back')} to={'/register'}>
                    Đăng kí
                </Button>
            </div>
        </div>
    );
}

export default Login;
