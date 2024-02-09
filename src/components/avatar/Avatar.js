import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
const cx = classNames.bind(styles);

function Avatar({ src, className, fallback = 'https://blog1203.netlify.app/images/avatar/avatar_56.png', ...props }) {
    const classes = cx('wrapper', {
        [className]: className,
    });
    return <img className={classes} src={src || fallback} {...props} />;
}

export default Avatar;
