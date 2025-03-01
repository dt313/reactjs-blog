import classNames from 'classnames/bind';
import styles from './Setting.module.scss';
import useTitle from '~/hook/useTitle';
import Image from '~/components/image';
import Button from '~/components/button/Button';

import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import SettingContent from './settingContent';
import { createSettingMenu } from '~/config/uiConfig';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Setting() {
    useTitle('Cài đặt');
    const [tag, setTag] = useState('info');
    const menu = createSettingMenu();
    const [content, setContent] = useState(menu[0].content);
    const [isVisibleMobileMenu, setIsVisibleMobileMenu] = useState(false);

    const handleChangeTag = (tag) => {
        setTag(tag);
        setContent(menu.find((item) => item.tag === tag).content);
        setIsVisibleMobileMenu(false);
    };

    const navigator = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('m-header')}>
                <span className={cx('close-icon')} onClick={() => navigator('/profile/@me')}>
                    <IoClose />
                </span>
                <span className={cx('menu-icon')} onClick={() => setIsVisibleMobileMenu(!isVisibleMobileMenu)}>
                    <IoMenu />
                </span>
            </div>
            <div className={cx('container')}>
                <div className={cx('left-side', isVisibleMobileMenu && 'visible')}>
                    <Image
                        className={cx('app-img')}
                        src="https://avatars.githubusercontent.com/u/129955138?v=4"
                        alt="Setting"
                    />
                    <h2 className={cx('title')}>Cài đặt tài khoản</h2>
                    <p className={cx('description')}>
                        Quản lý cài đặt tài khoản của bạn như thông tin cá nhân, cài đặt bảo mật, quản lý thông báo,
                        v.v.
                    </p>
                    <div className={cx('controller')}>
                        {menu.map((item, index) => (
                            <Button
                                key={index}
                                primary
                                leftIcon={item.icon}
                                className={cx('control-btn', tag === item.tag && 'active')}
                                onClick={() => handleChangeTag(item.tag)}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className={cx('right-side')}>
                    <SettingContent tag={tag} content={content} />
                </div>
            </div>
        </div>
    );
}

export default Setting;
