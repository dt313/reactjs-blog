import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Avatar from '../avatar';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import Comments from '~/components/comments';
import { useState } from 'react';
import CommentInput from '../commentInput';
const cx = classNames.bind(styles);

function Comment({ comment, className }) {
    const [seeMore, setSeeMore] = useState(false);
    const [reply, setReply] = useState(false);
    const [liked, setLiked] = useState(false);

    const see = comment?.reply;

    const handleSeeMore = () => {
        setSeeMore(!seeMore);
    };

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <Avatar src={comment?.avatar} />
                <div className={cx('comment')}>
                    <div className={cx('text-box')}>
                        <span className={cx('name')}>{comment?.name || 'Nguyen van A'}</span>
                        <p className={cx('text')}>{comment?.content}</p>
                    </div>
                    <div className={cx('tool-box')}>
                        <p className={cx('tool', liked && 'liked')} onClick={() => setLiked(!liked)}>
                            Like
                        </p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool')} onClick={() => setReply(true)}>
                            Reply
                        </p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool')}>Delete</p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool', 'no-hover')}>{comment?.time}</p>
                    </div>

                    {reply && (
                        <div className={cx('reply-box')}>
                            <CommentInput
                                placeholder="Reply here..."
                                reply={true}
                                isShow={reply}
                                setIsShow={setReply}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('comments')}>
                {see && (
                    <div className={cx('label')} onClick={handleSeeMore}>
                        <span className={cx('label-text')}>{seeMore ? 'See less' : 'See more'}</span>
                        {seeMore ? (
                            <BiChevronUp className={cx('up-icon')} />
                        ) : (
                            <BiChevronDown className={cx('down-icon')} />
                        )}
                    </div>
                )}
                {seeMore && <Comments list={comment?.reply} className={cx('list-reply')} />}
            </div>
        </div>
    );
}

export default Comment;
