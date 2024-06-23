import { useState } from 'react';
import Button from '~/components/button/Button';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { ImGithub, ImGoogle3, ImFacebook, ImMail } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/actions/authAction';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useTitle from '~/hook/useTitle';
import Validation from '~/helper/validation';
import { authService } from '~/services';
import debounce from '~/helper/debounce';
const cx = classNames.bind(styles);

function Login() {
    useTitle('Login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);
    const [info, setInfo] = useState({
        email: '',
        pwd: '',
    });

    const [error, setError] = useState({
        email: '',
        pwd: '',
    });

    let prePath = '';
    if (searchParams.size > 0) {
        prePath = searchParams.get('continue');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError((pre) => ({
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
        const Epwd = validation.init(pwd).isRequire().minLength().maxLength().getResult();
        validation.clear();

        return [Eemail, Epwd];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('SUBMIT');
        const [email, pwd] = validationLogin({ email: e.target[0].value, pwd: e.target[1].value });

        if (email === '' && pwd === '') {
            // fetch api to recveive token
            const result = await authService.login({ email: info.email, password: info.pwd });
            if (result?.code) {
                setError({ email: result.message });
            } else {
                dispatch(
                    login({
                        accessToken: result.token,
                        userId: result.userId,
                    }),
                );
                navigate(prePath || '/');
            }
        } else {
            setError({ email: email, pwd: pwd });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>
                Đăng nhập vào <span className={cx('logo')}>question.?</span>
            </h3>
            {isLoginWithEmail ? (
                <form className={cx('login-form')} onSubmit={handleSubmit}>
                    <label htmlFor="email" className={cx('login-label')}>
                        Email
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
                        Password
                    </label>
                    <input
                        type="password"
                        className={cx('login-input')}
                        name="pwd"
                        placeholder="Abc12345@"
                        value={info.pwd}
                        onChange={(e) => handleChange(e)}
                        autoComplete="off"
                    />
                    {error.pwd && <p className={cx('login-error')}>{error?.pwd}</p>}

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
