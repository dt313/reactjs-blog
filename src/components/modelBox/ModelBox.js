import classNames from 'classnames/bind';
import styles from './ModelBox.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../button/Button';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

function ModelBox({ children, title, isConfirm = false, onClose, onConfirm, className, error }) {
    const classes = cx('wrapper', {
        [className]: className,
        error,
    });
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ ease: 'easeOut', duration: 2 }}
            className={classes}
            onClick={(e) => e.stopPropagation()}
        >
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
        </motion.div>
    );
}

export default ModelBox;
