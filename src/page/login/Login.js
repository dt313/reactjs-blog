import { useEffect, useRef, useState } from 'react';
import Button from '~/components/button/Button';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { ImGithub, ImGoogle3 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/actions/authAction';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useTitle from '~/hook/useTitle';
import Validation from '~/helper/validation';
import { authService } from '~/services';
import { GITHUB_OAUTH_URL, GOOGLE_OAUTH_URL } from '~/contants';
import { addToast, createToast } from '~/redux/actions/toastAction';
import tokenUtils from '~/utils/token';
import setError from '~/helper/setError';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const cx = classNames.bind(styles);

function Login() {
    useTitle('Login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [info, setInfo] = useState({
        email: '',
        pwd: '',
    });

    const [error, setValidError] = useState({
        email: '',
        pwd: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    let prePath = useRef(null);

    useEffect(() => {
        if (searchParams.size > 0) {
            prePath.current = searchParams.get('continue');
        } else {
            prePath.current = '/';
        }
        tokenUtils.setRedirectPath(prePath.current);
    }, []);

    console.log(error);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValidError((pre) => ({
            ...pre,
            [name]: '',
        }));
        setInfo((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const validationLogin = ({ email, pwd }) => {
        const validation = new Validation();

        const Eemail = validation.init(email).isRequire().isEmail().getResult();
        validation.clear();
        const Epwd = validation.init(pwd).isRequire().getResult();
        validation.clear();

        return [Eemail, Epwd];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [email, pwd] = validationLogin({ email: e.target[0].value, pwd: e.target[1].value });

        if (email === '' && pwd === '') {
            // fetch api to recveive token
            try {
                const result = await authService.login({ email: info.email, password: info.pwd });
                dispatch(
                    login({
                        accessToken: result.token,
                        user: result.user,
                    }),
                );

                console.log(prePath.current);
                navigate(prePath.current);
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
        } else {
            setValidError({ email: email, pwd: pwd });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('title')}>
                    Đăng nhập vào <span className={cx('logo')}>Bagoftech</span>
                </h3>

                <div className={cx('content')}>
                    <div className={cx('login-box')}>
                        <Button
                            secondary
                            className={cx('btn')}
                            rounded
                            href={GOOGLE_OAUTH_URL}
                            leftIcon={<ImGoogle3 className={cx('icon')} />}
                        >
                            Đăng nhập với Google
                        </Button>
                        <Button
                            secondary
                            className={cx('btn')}
                            rounded
                            href={GITHUB_OAUTH_URL}
                            leftIcon={<ImGithub className={cx('icon')} />}
                        >
                            Đăng nhập với Github
                        </Button>
                        {/* <Button
                            secondary
                            className={cx('btn')}
                            href={FACEBOOK_OAUTH_URL}
                            leftIcon={<ImFacebook className={cx('icon')} />}
                        >
                            Đăng nhập với Facebook
                        </Button> */}
                    </div>
                </div>

                <form className={cx('login-form')} onSubmit={handleSubmit}>
                    <label htmlFor="email" className={cx('login-label')}>
                        Tên đăng nhập
                    </label>
                    <input
                        className={cx('login-input')}
                        name="email"
                        placeholder="abc@gmail.com"
                        value={info.email}
                        onChange={(e) => handleChange(e)}
                        autoComplete="off"
                    />
                    {error.email && <p className={cx('login-error')}>{error?.email}</p>}
                    <label htmlFor="pwd" className={cx('login-label')}>
                        Mật khẩu
                    </label>
                    <div className={cx('password-field')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={cx('login-input')}
                            name="pwd"
                            placeholder="Abc12345@"
                            value={info.pwd}
                            onChange={(e) => handleChange(e)}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            className={cx('toggle-password')}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {error.pwd && <p className={cx('login-error')}>{error?.pwd}</p>}

                    <Button secondary className={cx('login-btn')}>
                        Đăng nhập
                    </Button>
                </form>
                <div className={cx('footer')}>
                    <Button text className={cx('back')} to={'/'}>
                        Quay về trang chủ
                    </Button>
                    <Button text className={cx('back')} to={'/register'}>
                        Đăng kí
                    </Button>
                </div>

                <div className={cx('footer', 'forgot-password')}>
                    <Button text className={cx('back')} to={'/forgot-password'}>
                        Bạn đã quên mật khẩu ?
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
