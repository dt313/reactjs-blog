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
    yellow,
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
        yellow,
        outline,
        circle,
        text,
        small,
        large,
        rounded,
    });

    console.log(leftIcon);
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default memo(Button);
