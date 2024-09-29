import classNames from 'classnames/bind';
import styles from './Overlay.module.scss';

const cx = classNames.bind(styles);

function Overlay({ children, className, state, onClick }) {
    return (
        <div
            className={cx('wrapper', className, state ? 'active' : 'close')}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            {children}
        </div>
    );
}

export default Overlay;
