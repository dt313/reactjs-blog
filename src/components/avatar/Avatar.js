import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import images from '~/assets/images';
import { memo } from 'react';
const cx = classNames.bind(styles);

function Avatar({ src, className, fallback = images.noUser, ...props }) {
    const classes = cx('wrapper', {
        [className]: className,
    });
    return <img className={classes} src={src || fallback} {...props} />;
}

Avatar.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    fallback: PropTypes.string,
};

export default memo(Avatar);
