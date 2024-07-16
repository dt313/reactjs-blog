import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import Avatar from '../avatar';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import CommentInput from '../commentInput';
import { SpinnerLoader } from '../loading/Loading';
import MarkDown from '../MarkDown';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commentService, reactionService } from '~/services';
import { COMMENT_DEPTH, COMMENT_REPLY_PAGE_SIZE } from '~/config/uiConfig';
import calculateTime from '~/helper/calculateTime';
import checkReaction from '~/helper/checkReaction';
import Confirm from '../confirm';
import {
    addReplyComment,
    deleteReplyComment,
    initReplyComment,
    loadMoreReplyComment,
    reactionComment,
} from '~/redux/actions/commentAction';
import { sendNotification } from '~/socket';
import { notificationType, tableType } from '~/config/types';

const cx = classNames.bind(styles);
function Comment({ comment, className, level, onDelete = () => {} }) {
    console.log(comment);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [isShowReplyInput, setIsShowReplyInput] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [countOfReaction, setCountOfReaction] = useState(comment.reactionCount);
    const { id } = useParams();
    const handleClickLikeComment = async (type) => {
        const data = {
            reactionTableId: comment.id,
            reactionTableType: 'COMMENT',
            type: type,
            reactedUser: userId,
        };
        const result = await reactionService.tongleReaction(data);
        if (result?.status === 'OK') {
            setCountOfReaction(checkReaction(result?.data) ? countOfReaction + 1 : countOfReaction - 1);
            dispatch(reactionComment(comment.id, checkReaction(result.data)));
            sendNotification({
                sender: userId,
                type: notificationType.react_comment,
                receiver: comment.publisher.id,
                contextType: comment.commentType,
                contextId: id,
                directObjectType: tableType.comment,
                directObjectId: comment.id,
            });
        } else {
            alert(result?.message);
        }
    };

    const handeComment = async (content) => {
        const data = {
            commentableId: level < COMMENT_DEPTH - 1 ? comment.id : comment.commentableId,
            publisher: userId,
            commentType: 'COMMENT',
            content,
        };

        try {
            if (!comment.isSeeMore) {
                handleClickSeeMore();
            }
            const result = await commentService.createComment(data);
            dispatch(addReplyComment(data.commentableId, result));
            sendNotification({
                sender: userId,
                type: notificationType.reply_comment,
                receiver: comment.publisher.id,
                contextType: comment.commentType,
                contextId: id,
                directObjectType: tableType.comment,
                directObjectId: result.id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        const result = await commentService.deleteComment(id);
        if (result?.status === 'OK') {
            dispatch(deleteReplyComment(comment.id, id));
        }
    };

    const handleClickSeeMore = async () => {
        const data = {
            type: 'COMMENT',
            id: comment.id,
            pageNumber,
            pageSize: COMMENT_REPLY_PAGE_SIZE,
        };
        const result = await commentService.getAllCommentByType(data);
        dispatch(initReplyComment(comment.id, result));
    };

    // const handleConfirmCancle = () => {
    //     setIsShowConfirm(false);
    // };
    // const handleConfirmOk = async () => {
    //     const result = await commentService.deleteComment(comment?.id);
    //     if (result?.status === 'OK') {
    //         onDelete(comment?.id);
    //         setIsShowConfirm(false);
    //     }
    // };

    const handleLoadMoreComment = async () => {
        const data = {
            type: 'COMMENT',
            id: comment.id,
            pageNumber: comment.page + 1,
            pageSize: COMMENT_REPLY_PAGE_SIZE,
        };
        const result = await commentService.getAllCommentByType(data);
        dispatch(loadMoreReplyComment(comment.id, result));
    };

    console.log(comment.repliesCount, comment.page, COMMENT_REPLY_PAGE_SIZE);
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
                        <p
                            className={cx('tool', comment.is_reacted && 'liked')}
                            onClick={() => handleClickLikeComment('LIKE')}
                        >
                            {`${comment.reactionCount > 0 ? comment.reactionCount : ''} Like`}
                        </p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool')} onClick={() => setIsShowReplyInput(true)}>
                            {`${comment.repliesCount > 0 ? comment.repliesCount : ''} Replies`}
                        </p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool')} onClick={onDelete}>
                            Delete
                        </p>
                        <span className={cx('dot')}></span>
                        <p className={cx('tool', 'no-hover')}>{calculateTime(comment?.createdAt)}</p>
                    </div>

                    {isShowReplyInput && (
                        <div className={cx('reply-box')}>
                            <CommentInput
                                reply={true}
                                placeholder="Reply here"
                                isShow={isShowReplyInput}
                                onCloseInput={() => setIsShowReplyInput(false)}
                                onOpenInput={() => setIsShowReplyInput(false)}
                                onComment={handeComment}
                            />
                        </div>
                    )}
                </div>
            </div>
            {comment.repliesCount > 0 && (
                <div className={cx('label')} onClick={handleClickSeeMore}>
                    {!comment.isSeeMore && <span className={cx('label-text')}>Xem phản hồi</span>}
                    {!comment.isSeeMore && <BiChevronDown className={cx('down-icon')} />}
                </div>
            )}
            <div className={cx('comments')}>
                {comment.repliesCount > 0 && comment.isSeeMore && (
                    <>
                        {comment.replies?.map((comment) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                level={level + 1}
                                onDelete={() => handleDelete(comment.id)}
                            ></Comment>
                        ))}
                        {comment.repliesCount > comment.page * COMMENT_REPLY_PAGE_SIZE && (
                            <p className={cx('see-more')} onClick={handleLoadMoreComment}>
                                Xem thêm bình luận
                            </p>
                        )}
                    </>
                )}
            </div>

            {/* {isShowConfirm && (
                <Confirm
                    title="Bạn có chắc chắn muốn xóa bài viết nay không ?"
                    handleOK={handleConfirmOk}
                    handleCancle={handleConfirmCancle}
                />
            )} */}
        </div>
    );
}

export default Comment;
