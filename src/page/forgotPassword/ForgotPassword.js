import useTitle from '~/hook/useTitle';
import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/button/Button';
import { useState } from 'react';
import { mailService } from '~/services';
import { useDispatch } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import setError from '~/helper/setError';
import ContinueLoader from '~/components/loading';

const cx = classNames.bind(styles);

function ForgotPassword() {
    useTitle('Quên Mật Khẩu');

    const [email, setEmail] = useState('');
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleForgotPassword = async (e) => {
        // send to email
        if (email) {
            try {
                setLoading(true);
                const result = await mailService.getResetPasswordLink({ to: email });
                setType(1);
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
                setLoading(false);
            }
        } else {
            setType(2);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Forgot Password</h2>

                <p className={cx('description')}>
                    Vui lòng cung cấp địa chỉ email mà bạn đã sử dụng khi đăng ký tài khoản của mình. Nếu bạn quên
                    email, vui lòng liên hệ với chúng tôi.
                </p>

                <div className={cx('form')}>
                    <label className={cx('email-label')} htmlFor="email">
                        Nhập email :
                    </label>
                    <input
                        placeholder="Abc@gmail.com"
                        className={cx('email-input')}
                        type="email"
                        id="email"
                        pattern=".+@example\.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className={cx('loading-box')}>
                        <ContinueLoader small />
                    </div>
                ) : (
                    <p className={cx('description', 'sub-des', type === 1 && 'success-des', type === 2 && 'error-des')}>
                        {type === 0
                            ? 'Chúng tôi sẽ gửi một email để giúp bạn đặt lại mật khẩu.'
                            : type === 1
                            ? 'Chúng tôi đã gửi một email để giúp bạn đặt lại mật khẩu . Hãy kiểm tra email của bạn'
                            : 'Hãy nhập chính xác email'}
                    </p>
                )}

                <Button primary large onClick={handleForgotPassword}>
                    Xác nhận
                </Button>
            </div>
        </div>
    );
}

export default ForgotPassword;
