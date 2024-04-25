import styles from './MenuTippy.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const MenuTippy = ({ list, width, hide }) => {
    const handleClick = (content) => {
        if (typeof content.fn === 'function') {
            content.fn();
        }

        hide();
    };
    return (
        <div className={cx('menu-list')} style={{ width: `${width}px` }}>
            {list.map((content, index) => {
                return (
                    <p className={cx('menu-item')} key={index} onClick={() => handleClick(content)}>
                        {content?.title}
                    </p>
                );
            })}
        </div>
    );
};

export default MenuTippy;
