import classNames from 'classnames/bind';
import styles from './Overlay.module.scss';

const cx = classNames.bind(styles);

function Overlay({ children, className, onClick }) {
    return (
        <div className={cx('wrapper', className)} onClick={onClick}>
            {children}
        </div>
    );
}

export default Overlay;
