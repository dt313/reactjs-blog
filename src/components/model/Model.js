import classNames from 'classnames/bind';
import styles from './Model.module.scss';
import { MdClose } from 'react-icons/md';
import { memo } from 'react';
const cx = classNames.bind(styles);

const fn = () => {};
function Model({ children, onBack = fn }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('close')} onClick={onBack}>
                <MdClose className={cx('close-icon')} />
            </span>

            <div className={cx('body')}>{children}</div>
        </div>
    );
}

export default memo(Model);
