import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function ContinueLoader() {
    return <div className={cx('loader')}></div>;
}

export function SpinnerLoader({ small = false }) {
    return <div className={cx('spinner', small && 'small')}></div>;
}

export default ContinueLoader;
