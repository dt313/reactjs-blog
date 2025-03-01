import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Overlay.module.scss';
import { memo } from 'react';

const cx = classNames.bind(styles);

function Overlay({ children, className, state, onClick }) {
    return (
        <div
            className={cx('wrapper', className, state ? 'active' : 'close')}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
        </div>
    );
}

Overlay.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    state: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
};

export default memo(Overlay);
