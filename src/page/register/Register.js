import { useState } from 'react';
import Button from '~/components/button/Button';
import { ImGithub, ImGoogle3, ImFacebook, ImMail } from 'react-icons/im';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import useTitle from '~/hook/useTitle';
import Validation from '~/helper/validation';
import { userService } from '~/services';
import { useNavigate } from 'react-router-dom';
import { GITHUB_OAUTH_URL, GOOGLE_OAUTH_URL } from '~/contants';
const cx = classNames.bind(styles);

function Register() {
    useTitle('Register');
    const navigate = useNavigate();
    const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);
    const [error, setError] = useState({
        email: '',
        pwd: '',
        cfpwd: '',
    });

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
        setError((pre) => ({
            ...pre,
            [name]: '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const [email, pwd, cfpwd] = validationLogin({
            email: e.target[0].value,
            pwd: e.target[1].value,
            cfpwd: e.target[2].value,
        });

        if (email === '' && pwd === '' && cfpwd === '') {
            const fetchAPI = async () => {
                try {
                    const result = await userService.createUser({ email: info.email, password: info.pwd });
                    dispatch(
                        addToast(
                            createToast({
                                type: 'error',
                                content: error,
                            }),
                        ),
                    );
                    ('Create new user successfully');
                    navigate('/login');
                } catch (error) {
                    dispatch(
                        addToast(
                            createToast({
                                type: 'error',
                                content: error,
                            }),
                        ),
                    );
                }
            };
            fetchAPI();
        } else {
            setError({ email, pwd, cfpwd });
        }
    };

    const validationLogin = ({ email, pwd, cfpwd }) => {
        const validation = new Validation();

        const Eemail = validation.init(email).isRequire().isEmail().getResult();
        validation.clear();

        const Epwd = validation.init(pwd).isRequire().minLength().maxLength().getResult();
        validation.clear();

        const Ecfpwd = validation
            .init(pwd)
            .isConfirmPassWord(pwd, cfpwd)
            .isRequire()
            .minLength()
            .maxLength()
            .getResult();
        validation.clear();

        return [Eemail, Epwd, Ecfpwd];
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('title')}>
                    Đăng Kí vào <span className={cx('logo')}>question.?</span>
                </h3>
                <div className={cx('content')}>
                    <div className={cx('register-box')}>
                        <Button
                            secondary
                            className={cx('btn')}
                            rounded
                            href={GOOGLE_OAUTH_URL}
                            leftIcon={<ImGoogle3 className={cx('icon')} />}
                        >
                            Đăng kí với Google
                        </Button>
                        <Button
                            secondary
                            className={cx('btn')}
                            rounded
                            href={GITHUB_OAUTH_URL}
                            leftIcon={<ImGithub className={cx('icon')} />}
                        >
                            Đăng kí với Github
                        </Button>
                    </div>
                </div>
                <form className={cx('register-form')} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email" className={cx('register-label')}>
                        Tên đăng nhập - Email
                    </label>
                    <input
                        className={cx('register-input')}
                        name="email"
                        placeholder="abc@gmail.com"
                        value={info.email}
                        onChange={(e) => handleChange(e)}
                    />
                    {error.email && <p className={cx('register-error')}>{error?.email}</p>}

                    <label htmlFor="pwd" className={cx('register-label')}>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className={cx('register-input')}
                        name="pwd"
                        placeholder="Abc12345@"
                        value={info.pwd}
                        onChange={(e) => handleChange(e)}
                    />
                    {error.pwd && <p className={cx('register-error')}>{error?.pwd}</p>}
                    <label htmlFor="cfpwd" className={cx('register-label')}>
                        Nhập lại mật khẩu
                    </label>
                    <input
                        type="password"
                        placeholder="Abc12345@"
                        className={cx('register-input')}
                        name="cfpwd"
                        value={info.cfpwd}
                        onChange={(e) => handleChange(e)}
                    />
                    {error.cfpwd && <p className={cx('register-error')}>{error?.cfpwd}</p>}

                    <Button secondary className={cx('register-btn')}>
                        Đăng kí
                    </Button>
                </form>

                <div className={cx('footer')}>
                    <Button text className={cx('back')} to={'/'}>
                        Quay về trang chủ
                    </Button>
                    <Button text className={cx('back')} to={'/login'}>
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Register;
