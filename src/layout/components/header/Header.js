import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useOutsideClick from '~/hook/useOutsideClick';
import { MENU } from '~/config/uiConfig';
const cx = classNames.bind(styles);

function Header() {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const handleClickOutside = () => {
        setIsShowMenu(false);
    };
    const boxRef = useOutsideClick(handleClickOutside);

    return (
        <header className={cx('header')}>
            <div className={cx('header-inner')}>
                <div className={cx('header-logo')}>
                    <a href="/" className={cx('logo-a')}>
                        <div className={cx('logo')}>question.?</div>
                    </a>
                </div>
                <div
                    className={cx('menu-trigger')}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsShowMenu(!isShowMenu);
                    }}
                >
                    menu
                </div>
            </div>
            <nav className={cx('header-menu', !isShowMenu && 'hindden')} ref={boxRef}>
                <ul className={cx('menu-iner')}>
                    {MENU.map((item) => {
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => setIsShowMenu(false)}
                                    className={({ isActive }) => (isActive ? cx('active') : '')}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
