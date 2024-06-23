import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Avatar from '../avatar';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import Comments from '~/components/comments';
import { useEffect, useState } from 'react';
import CommentInput from '../commentInput';
import { SpinnerLoader } from '../loading/Loading';
import MarkDown from '../MarkDown';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { commentService, reactionService } from '~/services';
import { COMMENT_DEPTH, COMMENT_REPLY_PAGE_SIZE } from '~/config/uiConfig';
import calculateTime from '~/helper/calculateTime';
import checkReaction from '~/helper/checkReaction';
import Confirm from '../confirm';

const cx = classNames.bind(styles);
function Comment({ comment, className, level, onAdd, onDelete }) {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.userId);
    const [countOfReplyComment, setCountOfReplyComment] = useState(0);
    const [countOfReaction, setCountOfReaction] = useState(0);
    const [commentPageNumber, setCommentPageNumber] = useState(1);
    const [hasLoadMore, setHasLoadMore] = useState(comment?.repliesCount > commentPageNumber * COMMENT_REPLY_PAGE_SIZE);
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [reply, setReply] = useState(false);
    const [liked, setLiked] = useState(false);
    const [replyComments, setReplyComments] = useState([]);
    const [isShowConfirm, setIsShowConfirm] = useState(false);

    const handleSeeMore = () => {
        setIsSeeMore(!isSeeMore);
    };

    useEffect(() => {
        setCountOfReplyComment(comment?.repliesCount || 0);
    }, [comment]);
    console.log('COMMENT ', comment.id, countOfReplyComment);
    useEffect(() => {
        const fetchAPI = async () => {
            const isReacted = await reactionService.checkReaction({
                reactionTableType: 'COMMENT',
                reactionTableId: comment.id,
                userId: userId,
            });
            setLiked(checkReaction(isReacted?.data));
        };
        fetchAPI();
    }, []);

    const handleLoadMoreComment = () => {
        setHasLoadMore(countOfReplyComment > (commentPageNumber + 1) * COMMENT_REPLY_PAGE_SIZE);
        setCommentPageNumber(commentPageNumber + 1);
    };

    const handleClickLikeComment = async (type) => {
        const data = {
            reactionTableId: comment.id,
            reactionTableType: 'COMMENT',
            type: type,
            reactedUser: userId,
        };

        const result = await reactionService.tongleReaction(data);
        if (result?.status === 'OK') {
            setLiked(checkReaction(result?.data));
            setCountOfReaction(checkReaction(result?.data) ? countOfReaction + 1 : countOfReaction - 1);
        } else {
            alert(result?.message);
        }
    };

    useEffect(() => {}, []);

    // FETCH COMMENT
    useEffect(() => {
        const data = {
            type: 'COMMENT',
            id: comment.id,
            pageNumber: commentPageNumber,
            pageSize: COMMENT_REPLY_PAGE_SIZE,
        };
        const fetchAPI = async () => {
            const result = await commentService.getAllCommentByType(data);

            if (commentPageNumber === 1) {
                setReplyComments(result);
            } else setReplyComments((prev) => [...prev, ...result]);
        };
        fetchAPI();
    }, [commentPageNumber, comment]);

    const handeComment = async (content) => {
        const data = {
            commentableId: level < COMMENT_DEPTH - 1 ? comment.id : comment.commentableId,
            publisher: userId,
            commentType: 'COMMENT',
            content,
        };
        try {
            const result = await commentService.createComment(data);
            if (level < COMMENT_DEPTH - 1) {
                setReplyComments((prev) => [...prev, result]);
            } else {
                onAdd(result);
            }
            setCountOfReplyComment(countOfReplyComment + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const handleConfirmCancle = () => {
        setIsShowConfirm(false);
    };
    const handleConfirmOk = async () => {
        const result = await commentService.deleteComment(comment?.id);
        if (result?.status === 'OK') {
            onDelete(comment?.id);
            setIsShowConfirm(false);
        }
    };

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('container')}>
                <Avatar src={comment?.avatar} />
                <div className={cx('comment')}>
                    <div className={cx('text-box')}>
                        <span
                            className={cx('name')}
                            onClick={() => navigate(`/profile/@${comment?.publisher?.username}`)}
                        >
                            {comment?.publisher?.username || 'Me'}
                        </span>
                        <MarkDown className={cx('text')} text={comment?.content}></MarkDown>
                    </div>
                    <div className={cx('tool-box')}>
                        <p className={cx('tool', liked && 'liked')} onClick={() => handleClickLikeComment('LIKE')}>
                            {`${countOfReaction} Like`}
                        </p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool')} onClick={() => setReply(true)}>
                            {`${countOfReplyComment} Replies`}
                        </p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool')} onClick={() => setIsShowConfirm(true)}>
                            Delete
                        </p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool', 'no-hover')}>{calculateTime(comment?.createdAt)}</p>
                    </div>

                    {reply && (
                        <div className={cx('reply-box')}>
                            <CommentInput
                                placeholder="Reply here..."
                                reply={true}
                                // defaultValue={mention}
                                isShow={reply}
                                setIsShow={setReply}
                                onComment={handeComment}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('comments')}>
                {countOfReplyComment > 0 && (
                    <div className={cx('label')} onClick={handleSeeMore}>
                        <span className={cx('label-text')}>{isSeeMore ? 'See less' : 'See more'}</span>
                        {isSeeMore ? (
                            <BiChevronUp className={cx('up-icon')} />
                        ) : (
                            <BiChevronDown className={cx('down-icon')} />
                        )}
                    </div>
                )}

                {countOfReplyComment > 0 && isSeeMore && (
                    <Comments
                        list={replyComments}
                        setList={setReplyComments}
                        className={cx('list-reply')}
                        hasLoadMore={hasLoadMore}
                        onClickLoadMore={handleLoadMoreComment}
                        level={level + 1}
                    />
                )}
            </div>

            {isShowConfirm && (
                <Confirm
                    title="Bạn có chắc chắn muốn xóa bài viết nay không ?"
                    handleOK={handleConfirmOk}
                    handleCancle={handleConfirmCancle}
                />
            )}
        </div>
    );
}

export default Comment;
