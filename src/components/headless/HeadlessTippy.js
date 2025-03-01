import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import styles from './HeadlessTippy.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function HeadlessTippy({ children, menu, ...props }) {
    return (
        <Tippy
            {...props}
            render={(attrs) => (
                <div className={cx('box')} tabIndex="-1" {...attrs}>
                    <div className={cx('container')}>{menu}</div>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

HeadlessTippy.propTypes = {
    children: PropTypes.node.isRequired,
    menu: PropTypes.node.isRequired,
};

export default HeadlessTippy;
