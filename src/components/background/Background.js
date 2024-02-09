import classNames from 'classnames/bind';
import styles from './Background.module.scss';

const cx = classNames.bind(styles);
function Background({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Background;
