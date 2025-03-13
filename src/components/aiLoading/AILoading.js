import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AILoading.module.scss';

const cx = classNames.bind(styles);
function AILoading({ size }) {
    return <div className={cx('loader')} style={{ width: `${size}px`, height: `${size}px` }}></div>;
}

AILoading.propTypes = {
    width: PropTypes.string,
};
export default AILoading;
