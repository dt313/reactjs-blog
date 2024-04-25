import classNames from 'classnames/bind';
import styles from './404.module.scss';
import useTitle from '~/hook/useTitle';

const cx = classNames.bind(styles);
function NotFound() {
    useTitle('Not Found');
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>404</h2>
        </div>
    );
}

export default NotFound;
