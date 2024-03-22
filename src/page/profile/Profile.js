import Avatar from '~/components/avatar';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import TopicItem from '../search/TopicItem';
import { useSearchParams } from 'react-router-dom';
import { profileTag } from '~/config/uiConfig';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import HeadlessTippy from '~/components/headless/HeadlessTippy';
import MenuTippy from '~/components/menuTippy';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Profile() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({ tag: profileTag[0].tag });
    }, []);

    const menuList = ['Xóa', 'Sửa'];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <Avatar className={cx('avatar')} />
                    <h3 className={cx('name')}>DANH TUAN</h3>
                    <span className={cx('special-name')}>danhtuan3103</span>
                </div>
                <div className={cx('body')}>
                    <div className={cx('nav')}>
                        <div className={cx('topic-list')}>
                            {profileTag.map((nav, index) => {
                                return (
                                    <TopicItem
                                        className={cx('nav-link')}
                                        key={index}
                                        active={searchParams.get('tag') === nav.tag}
                                        topic={nav.name}
                                        onClickTopic={() => {
                                            const idx = profileTag.findIndex((item) => item.tag === nav.tag);
                                            setSearchParams({ tag: profileTag[idx].tag });
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {[1, 2, 3, 4, 5, 6, 6, 7, 8].map((content, index) => {
                            return (
                                <div className={cx('card')} key={index}>
                                    <div className={cx('card-header')}>
                                        <p className={cx('card-title')}>Hello anh em</p>
                                        <HeadlessTippy
                                            interactive
                                            trigger="mouseenter focus"
                                            offset={[-40, -80]}
                                            menu={<MenuTippy list={menuList} />}
                                        >
                                            <span className={cx('card-menu')}>
                                                <BiDotsHorizontalRounded className={cx('menu-icon')} />
                                            </span>
                                        </HeadlessTippy>
                                    </div>

                                    <span className={cx('card-type')}>question</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
