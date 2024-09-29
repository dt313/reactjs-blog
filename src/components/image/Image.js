import { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import images from '~/assets/images';

const Image = forwardRef(({ src, className, fallBack = images.noImage, ...props }, ref) => {
    return <img className={classNames(styles.wrapper, className)} ref={ref} src={src || fallBack} {...props} />;
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};
export default memo(Image);
