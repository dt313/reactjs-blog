import { useState } from 'react';
import Button from '~/components/button/Button';
import { ImGithub, ImGoogle3 } from 'react-icons/im';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import useTitle from '~/hook/useTitle';
import Validation from '~/helper/validation';
import { mailService, userService } from '~/services';
import { useNavigate } from 'react-router-dom';
import { GITHUB_OAUTH_URL, GOOGLE_OAUTH_URL } from '~/contants';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { useDispatch } from 'react-redux';
import setError from '~/helper/setError';
import { SpinnerLoader } from '~/components/loading/Loading';
const cx = classNames.bind(styles);

function Register() {
    useTitle('Register');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSentOtp, setIsSentOtp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setValidError] = useState({
        email: '',
        pwd: '',
        cfpwd: '',
        otp: '',
    });

    const [info, setInfo] = useState({
        email: '',
        pwd: '',
        cfpwd: '',
        otp: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInfo((pre) => ({
            ...pre,
            [name]: value,
        }));
        setValidError((pre) => ({
            ...pre,
            [name]: '',
        }));

        if (name === 'email') {
            setValidError((pre) => ({
                ...pre,
                opt: '',
            }));
            setIsSentOtp(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const [email, pwd, cfpwd, otp] = validationLogin({
            email: e.target[0].value,
            pwd: e.target[1].value,
            cfpwd: e.target[2].value,
            otp: e.target[3].value,
        });

        if (email === '' && pwd === '' && cfpwd === '' && otp === '') {
            const fetchAPI = async () => {
                try {
                    await userService.createUser({ email: info.email, password: info.pwd, otp: info.otp });
                    dispatch(
                        addToast(
                            createToast({
                                type: 'info',
                                content: 'Đăng kí thành công . Hãy đăng nhập vào ứng dụng',
                            }),
                        ),
                    );
                    navigate('/login');
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
            };
            fetchAPI();
        } else {
            setValidError({ email, pwd, cfpwd, otp });
        }
    };

    const validationLogin = ({ email, pwd, cfpwd, otp }) => {
        const validation = new Validation();

        const Eemail = validation.init(email).isRequire().isEmail().getResult();
        validation.clear();

        const Epwd = validation.init(pwd).isRequire().minLength().maxLength().isStrongPassword().getResult();
        validation.clear();

        const Eotp = validation.init(otp).isRequire().minLength(5).maxLength(7).getResult();
        validation.clear();

        const Ecfpwd = validation.init(pwd).isRequire().isConfirmPassWord(pwd, cfpwd).getResult();

        validation.clear();

        return [Eemail, Epwd, Ecfpwd, Eotp];
    };

    const handleClickGetOpt = async (e) => {
        e.preventDefault();
        const validation = new Validation();
        const Eemail = validation.init(info.email).isRequire().isEmail().getResult();

        if (Eemail) {
            setValidError((pre) => ({
                ...pre,
                opt: 'Hãy kiểm tra lại email của bạn',
            }));
        } else {
            setIsLoading(true);
            try {
                const result = await mailService.getOpt({ to: info.email });
                setIsSentOtp(true);
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
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('title')}>
                    Đăng Kí vào <span className={cx('logo')}>Bagoftech</span>
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
                    <div className={cx('password-wrapper')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={cx('register-input')}
                            name="pwd"
                            autoComplete="off"
                            placeholder="Abc12345@"
                            value={info.pwd}
                            onChange={(e) => handleChange(e)}
                        />
                        <span className={cx('password-toggle')} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {error.pwd && <p className={cx('register-error')}>{error?.pwd}</p>}

                    <label htmlFor="cfpwd" className={cx('register-label')}>
                        Nhập lại mật khẩu
                    </label>
                    <div className={cx('password-wrapper')}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Abc12345@"
                            className={cx('register-input')}
                            autoComplete="off"
                            name="cfpwd"
                            value={info.cfpwd}
                            onChange={(e) => handleChange(e)}
                        />
                        <span
                            className={cx('password-toggle')}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {error.cfpwd && <p className={cx('register-error')}>{error?.cfpwd}</p>}

                    <label htmlFor="opt" className={cx('register-label')}>
                        Nhập mã OTP
                    </label>
                    <div className={cx('opt-form')}>
                        <input
                            type="number"
                            placeholder="12345"
                            className={cx('register-input')}
                            autoComplete="off"
                            name="otp"
                            value={info.otp}
                            onChange={(e) => handleChange(e)}
                        />
                        <Button onClick={handleClickGetOpt} primary className={cx('opt-btn')}>
                            Nhận OTP
                        </Button>
                    </div>

                    {error.otp ? (
                        <p className={cx('register-error')}>{error?.otp}</p>
                    ) : (
                        <p className={cx('opt-des')}>
                            {isLoading ? (
                                <div className={cx('loading')}>
                                    <SpinnerLoader small />
                                </div>
                            ) : isSentOtp ? (
                                "Hãy kiểm tra gmail của bạn. Nếu không nhận được mã hãy lại nút 'Nhận OTP' hoặc kiểm tra xem gmail của bạn có đúng hay không"
                            ) : (
                                'Ấn nút nhận OPT để nhận mã bằng gmail của bạn'
                            )}{' '}
                        </p>
                    )}

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
