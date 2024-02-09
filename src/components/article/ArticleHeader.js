import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Image from '~/components/image';
import Avatar from '../avatar/Avatar';
const cx = classNames.bind(styles);
function ArticleHeader({ author, avatar, className, isBookmarked, large = false, time = false }) {
    const classes = cx('header', {
        [className]: className,
        large,
    });
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

                <span className={cx('icon-wrap')}>
                    <BiDotsHorizontalRounded className={cx('icon')} />
                </span>
            </div>
        </div>
    );
}

export default ArticleHeader;
