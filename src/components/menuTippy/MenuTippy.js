import styles from './MenuTippy.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const MenuTippy = ({ list, width }) => {
    return (
        <div className={cx('menu-list')} style={{ width: `${width}px` }}>
            {list.map((content, index) => {
                return (
                    <p className={cx('menu-item')} key={index}>
                        {content}
                    </p>
                );
            })}
        </div>
    );
};

export default MenuTippy;
