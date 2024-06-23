import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useOutsideClick from '~/hook/useOutsideClick';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/actions/authAction';
import images from '~/assets/images';
import { authService } from '~/services';
import { tokenUtils } from '~/utils';
const cx = classNames.bind(styles);

function Header() {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const isAuthtication = useSelector((state) => state.auth.isAuthtication);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickOutside = () => {
        setIsShowMenu(false);
    };

    const handleLogout = () => {
        const accessToken = tokenUtils.getAccessToken();
        const fetchAPI = async () => {
            const result = await authService.logout(accessToken);
            if (result?.code) {
                alert(result.message);
            } else {
                dispatch(logout());
                window.location.href = '/login';
            }
        };
        fetchAPI();
    };

    const handleClick = (e, item) => {
        setIsShowMenu(false);
        if (item.action) {
            e.preventDefault();
            item.action();
        }
    };

    const boxRef = useOutsideClick(handleClickOutside);

    const MENU = [
        {
            path: '/search',
            title: 'search',
        },

        {
            path: '/ask',
            title: 'ask',
        },

        {
            path: '/write',
            title: 'write',
        },
        {
            path: '/profile/@me',
            title: 'profile',
        },
        {
            path: '/about',
            title: 'about',
        },
        {
            path: '/login',
            title: !isAuthtication ? 'login' : 'logout',
            action: isAuthtication && handleLogout,
        },
    ];

    return (
        <header className={cx('header')}>
            <div className={cx('header-inner')}>
                <div className={cx('header-logo')}>
                    <a href="/" className={cx('logo-a')}>
                        <div className={cx('logo')}>
                            {/* <img className={cx('logo-img')} src={images.logo} /> */}
                            <span>bagoftech</span>
                        </div>
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
                                    onClick={(e) => handleClick(e, item)}
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
