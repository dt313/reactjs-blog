import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Avatar from '../avatar/Avatar';
import HeadlessTippy from '~/components/headless/HeadlessTippy';
import MenuTippy from '~/components/menuTippy';
const cx = classNames.bind(styles);
function ArticleHeader({ author, avatar, className, isBookmarked, large = false, time = false }) {
    const classes = cx('header', {
        [className]: className,
        large,
    });

    const menuList = ['Chia sẻ lên Facebbok', 'Sao chép liên kết', 'Báo cáo bài viết'];
    return (
        <div className={classes}>
            <div className={cx('user')}>
                <Avatar className={cx('avatar')} src={avatar} alt="name" />
                <div className={cx('blog-info')}>
                    <span className={cx('author')}>{author}</span>
                    {time && <span className={cx('date')}>10 ngay truoc</span>}
                </div>
            </div>

            <div className={cx('icon-box')}>
                <span className={cx('icon-wrap')}>
                    {isBookmarked ? (
                        <BsBookmarkFill className={cx('icon', 'active')} />
                    ) : (
                        <BsBookmark className={cx('icon')} />
                    )}
                </span>
                <HeadlessTippy
                    interactive
                    trigger="click"
                    offset={[-90, -120]}
                    menu={<MenuTippy width={200} list={menuList} />}
                >
                    <span className={cx('icon-wrap')}>
                        <BiDotsHorizontalRounded className={cx('icon')} />
                    </span>
                </HeadlessTippy>
            </div>
        </div>
    );
}

export default ArticleHeader;
