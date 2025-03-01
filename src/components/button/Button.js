import PropTypes from 'prop-types';
import { memo } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    children,
    className,
    primary,
    secondary,
    text,
    outline,
    rounded,
    circle,
    small,
    large,
    to,
    href,
    disabled,
    leftIcon,
    rightIcon,
    onClick,
    ...passprops
}) {
    const props = { onClick, ...passprops };
    let Comp = 'button';

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: className,
        disabled,
        primary,
        secondary,
        outline,
        circle,
        text,
        small,
        large,
        rounded,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    text: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    circle: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    to: PropTypes.string,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default memo(Button);
