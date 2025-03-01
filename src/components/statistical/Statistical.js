import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Statistical.module.scss';
import { FaRegComment } from 'react-icons/fa6';
import defaultFn from '~/utils/defaultFn';
import ReactionButton from '../reactionButton';
const cx = classNames.bind(styles);

function Statistical({
    like = 0,
    comment = 0,
    className,
    around,
    liked,
    likedUsers,
    onClickLike = defaultFn,
    onClickComment = defaultFn,
}) {
    const classes = cx('wrapper', { [className]: className });

    return (
        <div className={classes}>
            <ReactionButton list={likedUsers} total={like} reacted={liked} />
            <div
                className={cx('comment', around && 'around', comment === 0 && 'no-underline')}
                onClick={onClickComment}
            >
                {comment === 0 && <FaRegComment className={cx('icon', 'comment-icon')} />}
                <span className={cx('number')}>
                    {' '}
                    {comment} {comment !== 0 && 'bình luận'}{' '}
                </span>
            </div>
        </div>
    );
}

Statistical.propTypes = {
    like: PropTypes.number.isRequired,
    comment: PropTypes.number.isRequired,
    className: PropTypes.string,
    around: PropTypes.bool,
    liked: PropTypes.bool,
    likedUsers: PropTypes.array,
    onClickLike: PropTypes.func,
    onClickComment: PropTypes.func,
};

export default Statistical;
