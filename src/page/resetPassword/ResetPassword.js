import useTitle from '~/hook/useTitle';
import styles from './ResetPassword.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/button/Button';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userService } from '~/services';
import { useDispatch } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import setError from '~/helper/setError';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Add this import
import Validation from '~/helper/validation';
const cx = classNames.bind(styles);

function ResetPassword() {
    useTitle('Reset Mật Khẩu');

    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [perror, setPError] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();

    const token = searchParams.get('token');

    const validationPassword = ({ password, cPassword }) => {
        const validation = new Validation();

        const Epwd = validation
            .init(password)
            .isRequire('Vui lòng nhập đầy đủ thông tin')
            .minLength(8, 'Vui lòng nhập mật khẩu lớn hơn 8 kí tự')
            .maxLength(20, 'Vui lòng nhập mật khẩu nhỏ hơn 20 kí tự')
            .getResult();

        validation.clear();

        const Ecfpwd = validation
            .init(cPassword)
            .isRequire('Vui lòng nhập đầy đủ thông tin')
            .isConfirmPassWord(password, cPassword)
            .getResult();

        validation.clear();

        return [Epwd, Ecfpwd];
    };

    const handleResetPassword = async () => {
        // send to password
        if (token === null) {
            dispatch(
                addToast(
                    createToast({
                        type: 'warning',
                        content: 'Token không hợp lệ ! Hãy thử lại link trong email !',
                    }),
                ),
            );
            return;
        }

        const [Epwd, Ecfpwd] = validationPassword({ password, cPassword });

        console.log({ Epwd, Ecfpwd });
        if (Epwd === '' && Ecfpwd === '') {
            try {
                const result = await userService.resetPassword(token, password);
                dispatch(
                    addToast(
                        createToast({
                            type: 'info',
                            content: 'Bạn đã thay đổi mật khẩu thành công . Hãy thử đăng nhập vào ứng dụng !',
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
        } else {
            setPError(Epwd || Ecfpwd);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Đặt lại mật khẩu</h2>

                <form className={cx('form')}>
                    <label className={cx('password-label')} htmlFor="password">
                        Nhập mật khẩu mới :
                    </label>
                    <div className={cx('password-field')}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Abc123xyz@"
                            className={cx('password-input')}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={cx('toggle-password')}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <label className={cx('password2-label')} htmlFor="password2">
                        Nhập lại mật khẩu mới :
                    </label>
                    <div className={cx('password-field')}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Abc123xyz@"
                            className={cx('password2-input')}
                            id="password2"
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={cx('toggle-password')}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </form>

                <p className={cx('notification', perror && 'error')}>{perror}</p>

                <Button primary large onClick={handleResetPassword}>
                    Đặt mật khẩu
                </Button>
            </div>
        </div>
    );
}

export default ResetPassword;
