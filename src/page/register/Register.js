import { useState } from 'react';
import Button from '~/components/button/Button';
import { ImGithub, ImGoogle3, ImFacebook, ImMail } from 'react-icons/im';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { logout } from '~/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import useTitle from '~/hook/useTitle';
import Validation from '~/helper/validation';
const cx = classNames.bind(styles);

function Register() {
    useTitle('Register');
    const dispatch = useDispatch();
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
            console.log('Submit');
        } else {
            setError({ email, pwd, cfpwd });
        }

        // send data to server
        // test logout
        // dispatch(logout());
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
            <h3 className={cx('title')}>
                Đăng Kí vào <span className={cx('logo')}>question.?</span>
            </h3>
            {isLoginWithEmail ? (
                <form className={cx('register-form')} onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email" className={cx('register-label')}>
                        Email
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
                        Password
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
                        Confirm password
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
            ) : (
                <div className={cx('content')}>
                    <div className={cx('register-box')}>
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
