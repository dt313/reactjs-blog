import classNames from 'classnames/bind';
import { memo } from 'react';
import styles from './Toast.module.scss';
import { useSelector } from 'react-redux';
import Item from './Item';

const cx = classNames.bind(styles);
function Toast({ placement, duration }) {
    const { toasts } = useSelector((state) => state.toast);
    if (toasts?.length > 0) {
        return (
            <div className={cx('wrapper', placement.split(' '))}>
                {toasts.map((toast, index) => {
                    return <Item key={toast.id} toast={toast} duration={duration} />;
                })}
            </div>
        );
    } else {
        return <></>;
    }
}

export default memo(Toast);
