import { useState } from 'react';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import HeadlessTippy from '~/components/headless/HeadlessTippy';
import MenuTippy from '~/components/menuTippy';

const cx = classNames.bind(styles);

function Card({ content, tippyMenu }) {
    const [visible, setVisible] = useState(false);

    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };

    return (
        <div className={cx('card')}>
            <div className={cx('card-header')}>
                <p className={cx('card-title')}>Hello anh em</p>
                <HeadlessTippy
                    visible={visible}
                    interactive
                    offset={[-50, -100]}
                    onClickOutside={hide}
                    menu={<MenuTippy width={120} list={tippyMenu} hide={hide} />}
                >
                    <span className={cx('card-menu')} onClick={show}>
                        <BiDotsHorizontalRounded className={cx('menu-icon')} onClick={show} />
                    </span>
                </HeadlessTippy>
            </div>

            <span className={cx('card-type')}>question</span>
        </div>
    );
}

export default Card;
