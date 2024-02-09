import classNames from 'classnames/bind';
import styles from './Statistical.module.scss';
import { FaHeart, FaComment } from 'react-icons/fa6';
import { GoCommentDiscussion } from 'react-icons/go';
const cx = classNames.bind(styles);

function Statistical({ like = 0, comment = 0, className, around }) {
    const classes = cx('wrapper', { [className]: className });
    return (
        <div className={classes}>
            <div className={cx('like', around && 'around')}>
                <FaHeart className={cx('icon', 'like-icon')} />
                <span>{like}</span>
            </div>
            <div className={cx('comment', around && 'around')}>
                <FaComment className={cx('icon', 'comment-icon')} />
                <span>{comment}</span>
            </div>
        </div>
    );
}

export default Statistical;
