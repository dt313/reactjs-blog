import classNames from 'classnames/bind';
import styles from './Statistical.module.scss';
import { FaHeart, FaComment } from 'react-icons/fa6';
import { GoCommentDiscussion } from 'react-icons/go';
import defaultFn from '~/utils/defaultFn';
const cx = classNames.bind(styles);

function Statistical({
    like = 0,
    comment = 0,
    className,
    around,
    liked,
    onClickLike = defaultFn,
    onClickComment = defaultFn,
}) {
    const classes = cx('wrapper', { [className]: className });
    return (
        <div className={classes}>
            <div className={cx('like', around && 'around')} onClick={onClickLike}>
                <FaHeart className={cx('icon', 'like-icon', liked && 'liked')} />
                <span>{like}</span>
            </div>
            <div className={cx('comment', around && 'around')} onClick={onClickComment}>
                <FaComment className={cx('icon', 'comment-icon')} />
                <span>{comment}</span>
            </div>
        </div>
    );
}

export default Statistical;
