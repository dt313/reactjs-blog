import classNames from 'classnames/bind';
import styles from './DropMenu.module.scss';
import HeadlessTippy from '../headless/HeadlessTippy';
import MenuTippy from '../menuTippyItem';
import { useState } from 'react';

const cx = classNames.bind(styles);
function DropMenu({ children, menu, offset = [0, 0], width = 200 }) {
    const [visible, setVisible] = useState(false);

    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };

    return (
        <HeadlessTippy
            interactive
            visible={visible}
            offset={offset}
            onClickOutside={hide}
            menu={<MenuTippy width={width} list={menu} hide={hide} />}
        >
            <span className={cx('icon-wrap')} onClick={show}>
                {children}
            </span>
        </HeadlessTippy>
    );
}

export default DropMenu;
