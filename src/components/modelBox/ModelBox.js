import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ModelBox.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../button/Button';
import { memo } from 'react';

const cx = classNames.bind(styles);

function ModelBox({ children, state, title, isConfirm = false, onClose, onConfirm, className, error }) {
    const classes = cx('wrapper', {
        [className]: className,
        error,
        close: !state,
    });
    return (
        <div className={classes} onClick={(e) => e.stopPropagation()}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{title}</h3>
                <span className={cx('close-icon-wrap')} onClick={onClose}>
                    <IoClose className={cx('close-icon')} />
                </span>
            </div>
            <div className={cx('content')}>{children}</div>
            {isConfirm && (
                <div className={cx('confirm')}>
                    <Button text onClick={onClose}>
                        Hủy
                    </Button>
                    <Button primary rounded onClick={onConfirm}>
                        Đồng ý
                    </Button>
                </div>
            )}
        </div>
    );
}

ModelBox.propTypes = {
    children: PropTypes.node.isRequired,
    state: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    isConfirm: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isConfirm: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool,
};

export default memo(ModelBox);
