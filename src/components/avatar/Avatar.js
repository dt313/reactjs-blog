import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Avatar({ src, className, fallback = images.noUser, ...props }) {
    const classes = cx('wrapper', {
        [className]: className,
    });
    return <img className={classes} src={src || fallback} {...props} />;
}

export default Avatar;
