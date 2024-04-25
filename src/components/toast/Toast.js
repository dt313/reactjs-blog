import classNames from 'classnames/bind';
import { memo, useEffect } from 'react';
import styles from './Toast.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { MdError, MdInfo, MdWarning } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { deleteByDuration, deleteToast } from '~/redux/actions/toastAction';

const cx = classNames.bind(styles);
function Toast({ placement, duration }) {
    const { toasts } = useSelector((state) => state.toast);
    const dispatch = useDispatch();
    console.log('Toast: ', toasts);

    useEffect(() => {
        let timeout;
        if (toasts?.length > 0) {
            timeout = setTimeout(() => {
                dispatch(deleteByDuration());
            }, duration);
        }

        return () => clearTimeout(timeout);
    }, [toasts]);

    const handleDeleteToast = (id) => {
        dispatch(deleteToast(id));
    };
    const getIcon = (type) => {
        if (type === 'info' || type === 'success') {
            return MdInfo;
        }
        if (type === 'error') {
            return MdError;
        }
        if (type === 'warning') {
            return MdWarning;
        }
    };
    if (toasts?.length > 0) {
        return (
            <div className={cx('wrapper', placement.split(' '))}>
                {toasts.map((toast, index) => {
                    const Icon = getIcon(toast.type);
                    return (
                        <div className={cx('toast-box')} key={index}>
                            <span className={cx('close-btn')} onClick={() => handleDeleteToast(toast.id)}>
                                <IoClose className={cx('close-icon')} />
                            </span>
                            <Icon className={cx('icon', { [toast.type]: toast.type })} />
                            <p key={index} className={cx('content')}>
                                {toast.content}
                            </p>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return <></>;
    }
}

export default memo(Toast);
