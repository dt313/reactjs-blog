import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CloseBox.module.scss';
import { IoClose } from 'react-icons/io5';
import { memo } from 'react';
const cx = classNames.bind(styles);

const fn = () => {};
function CloseBox({ children, onBack = fn, state = true }) {
    return (
        <div className={cx('wrapper', !state && 'closing')}>
            <span className={cx('close')} onClick={onBack}>
                <IoClose className={cx('close-icon')} />
            </span>

            <div className={cx('body')}>{children}</div>
        </div>
    );
}

CloseBox.propTypes = {
    children: PropTypes.node.isRequired,
    onBack: PropTypes.func.isRequired,
    state: PropTypes.bool.isRequired,
};

export default memo(CloseBox);
