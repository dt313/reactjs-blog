import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from '../button/Button';
import styles from './MenuTippyItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MenuTippyItem = ({ list, width, hide }) => {
    const handleClick = (content) => {
        if (typeof content.fn === 'function') {
            content.fn();
        }

        hide();
    };

    return (
        <div className={cx('menu-list')} style={{ width: `${width}px` }}>
            {list.map((content, index) => {
                if (content?.copyText) {
                    return (
                        <CopyToClipboard key={index} text={content.copyText} onCopy={() => handleClick(content)}>
                            <Button className={cx('menu-item')}>{content?.title}</Button>
                        </CopyToClipboard>
                    );
                } else {
                    return (
                        <Button className={cx('menu-item')} key={index} onClick={() => handleClick(content)}>
                            {content?.title}
                        </Button>
                    );
                }
            })}
        </div>
    );
};

MenuTippyItem.propTypes = {
    list: PropTypes.array.isRequired,
    width: PropTypes.number,
    hide: PropTypes.func.isRequired,
};

export default MenuTippyItem;
