import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Avatar from '../avatar';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import Comments from '~/components/comments';
import { useEffect, useState } from 'react';
import CommentInput from '../commentInput';
import { SpinnerLoader } from '../loading/Loading';
import MarkDown from '../MarkDown';
import { comments } from '~/config/comments';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

function Comment({ comment, className }) {
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [reply, setReply] = useState(false);
    const [liked, setLiked] = useState(false);
    const [replyComments, setReplyComments] = useState([]);
    const handleSeeMore = () => {
        setIsSeeMore(!isSeeMore);
    };

    const handeComment = (content) => {
        console.log('Handle comment : ', content);
        setReplyComments((pre) => [
            ...pre,
            {
                id: uuidv4(),
                user_id: '328193ybdhad',
                commentable_type: 'COMMENT',
                commentable_id: comment.id,
                content: content,
                created_at: '10 ngay truoc',
                created_at: '10 ngay truoc',
            },
        ]);
        setIsSeeMore(true);
    };

    useEffect(() => {
        const replyCmts = comments.filter((c) => c.commentable_type === 'COMMENT' && c.commentable_id === comment.id);
        setReplyComments(replyCmts);
    }, []);

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <Avatar src={comment?.avatar} />
                <div className={cx('comment')}>
                    <div className={cx('text-box')}>
                        <span className={cx('name')}>{comment?.name || 'Me'}</span>
                        <MarkDown className={cx('text')} text={comment?.content}></MarkDown>
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
                        <p className={cx('tool', 'no-hover')}>{comment?.created_at}</p>
                    </div>

                    {reply && (
                        <div className={cx('reply-box')}>
                            <CommentInput
                                placeholder="Reply here..."
                                reply={true}
                                isShow={reply}
                                setIsShow={setReply}
                                onComment={handeComment}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('comments')}>
                {!!replyComments.length && (
                    <div className={cx('label')} onClick={handleSeeMore}>
                        <span className={cx('label-text')}>{isSeeMore ? 'See less' : 'See more'}</span>
                        {isSeeMore ? (
                            <BiChevronUp className={cx('up-icon')} />
                        ) : (
                            <BiChevronDown className={cx('down-icon')} />
                        )}
                    </div>
                )}

                {isSeeMore && <Comments list={replyComments} className={cx('list-reply')} />}
            </div>
        </div>
    );
}

export default Comment;
