import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Avatar from '../avatar/Avatar';
import HeadlessTippy from '~/components/headless/HeadlessTippy';
import MenuTippy from '~/components/menuTippy';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);
function ArticleHeader({ author, username, avatar, className, large = false, time = false }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);

    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };

    // menu tippy
    const menuList = [{ title: 'Chia sẻ lên Facebbok' }, { title: 'Sao chép liên kết' }, { title: 'Báo cáo bài viết' }];

    // handle click user
    const handleClickUser = () => {
        navigate(`/profile/@${username}`);
    };

    // handle bookmark
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const classes = cx('header', {
        [className]: className,
        large,
    });
    return (
        <div className={classes}>
            <div className={cx('user')} onClick={handleClickUser}>
                <Avatar className={cx('avatar')} src={avatar} alt="name" />
                <div className={cx('blog-info')}>
                    <span className={cx('author')}>{author}</span>
                    {time && <span className={cx('date')}>10 ngay truoc</span>}
                </div>
            </div>

            <div className={cx('icon-box')}>
                <span className={cx('icon-wrap')}>
                    {isBookmarked ? (
                        <BsBookmarkFill className={cx('icon', 'active')} onClick={handleBookmark} />
                    ) : (
                        <BsBookmark className={cx('icon')} onClick={handleBookmark} />
                    )}
                </span>
                <HeadlessTippy
                    interactive
                    visible={visible}
                    offset={[-90, -150]}
                    onClickOutside={hide}
                    menu={<MenuTippy width={200} list={menuList} hide={hide} />}
                >
                    <span className={cx('icon-wrap')} onClick={show}>
                        <BiDotsHorizontalRounded className={cx('icon')} />
                    </span>
                </HeadlessTippy>
            </div>
        </div>
    );
}

export default ArticleHeader;
