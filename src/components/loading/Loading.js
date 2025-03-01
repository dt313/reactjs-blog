import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function ContinueLoader({ small, medium }) {
    return <div className={cx('loader', small && 'small', medium && 'medium')}></div>;
}

ContinueLoader.propTypes = {
    small: PropTypes.bool,
    medium: PropTypes.bool,
};

export function SpinnerLoader({ small = false }) {
    return <div className={cx('spinner', small && 'small')}></div>;
}

SpinnerLoader.propTypes = {
    small: PropTypes.bool,
};

export default ContinueLoader;
