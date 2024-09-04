import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Avatar from '../avatar';
import { BiChevronDown } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';
import CommentInput from '../commentInput';
import { SpinnerLoader } from '../loading/Loading';
import MarkDown from '../markdown';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commentService, reactionService } from '~/services';
import { COMMENT_DEPTH, COMMENT_REPLY_PAGE_SIZE } from '~/config/uiConfig';
import calculateTime from '~/helper/calculateTime';
import checkReaction from '~/helper/checkReaction';
import { addToast, createToast } from '~/redux/actions/toastAction';

import {
    addReplyComment,
    deleteReplyComment,
    initReplyComment,
    loadMoreReplyComment,
    reactionComment,
} from '~/redux/actions/commentAction';
import { sendNotificationWithCondition } from '~/socket';
import { notificationType, tableType } from '~/config/types';
import DropMenu from '../dropMenu';
import requireAuthFn from '~/helper/requireAuthFn';

const cx = classNames.bind(styles);

function Comment({ contextId, comment, className, level, onDelete = () => {} }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId, isAuthentication } = useSelector((state) => state.auth);
    const [isShowReplyInput, setIsShowReplyInput] = useState(false);
    const [countOfReaction, setCountOfReaction] = useState(comment.reaction_count);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const ref = useRef(null);

    const parent_id = parseInt(searchParams.get('parent_id')) || null;
    const direct_id = parseInt(searchParams.get('direct_id')) || null;

    useEffect(() => {
        console.log('useEffect', parent_id, parent_id, comment.id);
        if (parent_id && parent_id === comment?.id && comment.isSeeMore === false) {
            handleClickSeeMore();
        }

        if (direct_id && direct_id === comment?.id) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [searchParams]);

    const menuList = [
        {
            title: 'Delete',
            fn: onDelete,
        },
    ];

    const handleClickLikeComment = async (type) => {
        const data = {
            reactionTableId: comment.id,
            reactionTableType: 'COMMENT',
            type: type,
            reactedUser: userId,
        };

        try {
            const result = await reactionService.tongleReaction(data);
            setCountOfReaction(checkReaction(result?.data) ? countOfReaction + 1 : countOfReaction - 1);
            dispatch(reactionComment(comment.id, checkReaction(result.data)));
            sendNotificationWithCondition(comment.is_reacted === false && userId !== comment.publisher.id, {
                sender: userId,
                type: notificationType.react_comment,
                receiver: comment.publisher.id,
                contextType: 'ARTICLE',
                contextId: contextId,
                directObjectType: tableType.comment,
                directObjectId: comment.id,
            });
        } catch (error) {
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: error,
                    }),
                ),
            );
        }
    };

    const handeComment = async (content) => {
        const data = {
            commentableId: level < COMMENT_DEPTH - 1 ? comment.id : comment.comment_table_id,
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
            sendNotificationWithCondition(userId !== comment.publisher.id, {
                sender: userId,
                type: notificationType.reply_comment,
                receiver: comment.publisher.id,
                contextType: 'ARTICLE',
                contextId: contextId,
                directObjectType: tableType.comment,
                directObjectId: result.id,
            });
        } catch (error) {
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: error,
                    }),
                ),
            );
        }
    };

    const handleDelete = async (id) => {
        try {
            await commentService.deleteComment(id);
            dispatch(deleteReplyComment(comment.id, id));
        } catch (error) {
            alert(error);
        }
    };

    const handleClickSeeMore = async () => {
        console.log('seeee mo re');
        const data = {
            type: 'COMMENT',
            id: comment.id,
            pageNumber: 1,
            pageSize: COMMENT_REPLY_PAGE_SIZE,
        };

        try {
            setLoading(true);
            const result = await commentService.getAllCommentByType(data);
            dispatch(initReplyComment(comment.id, result));
        } catch (error) {
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: error.message,
                    }),
                ),
            );
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMoreComment = async () => {
        try {
            const data = {
                type: 'COMMENT',
                id: comment.id,
                pageNumber: comment.page + 1,
                pageSize: COMMENT_REPLY_PAGE_SIZE,
            };
            const result = await commentService.getAllCommentByType(data);
            dispatch(loadMoreReplyComment(comment.id, result));
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div id={comment.id} className={cx('wrapper', className)} ref={ref}>
            <div className={cx('container')}>
                <Avatar src={comment?.publisher.avatar} />
                <div className={cx('comment', { active: parseInt(searchParams.get('direct_id')) === comment.id })}>
                    <div className={cx('text-box')}>
                        <div className={cx('comment-header')}>
                            <span
                                className={cx('name')}
                                onClick={() => navigate(`/profile/@${comment?.publisher?.username}`)}
                            >
                                {comment?.publisher?.username || 'Me'}
                            </span>
                            {userId === comment.publisher.id && (
                                <DropMenu offset={[-35, -60]} menu={menuList} width={100}>
                                    <BiDotsHorizontalRounded className={cx('icon')} />
                                </DropMenu>
                            )}
                        </div>
                        <MarkDown className={cx('text')} text={comment?.content}></MarkDown>
                    </div>
                    <div className={cx('tool-box')}>
                        <p
                            className={cx('tool', comment.is_reacted && 'liked')}
                            onClick={() =>
                                requireAuthFn(
                                    isAuthentication,
                                    () => handleClickLikeComment('LIKE'),
                                    () => {
                                        dispatch(
                                            addToast(
                                                createToast({
                                                    type: 'warning',
                                                    content: 'Bạn cần đăng nhập để thích bình luận này',
                                                }),
                                            ),
                                        );
                                    },
                                )
                            }
                        >
                            {`${countOfReaction > 0 ? countOfReaction : ''} Like`}
                        </p>
                        <span className={cx('dot')}></span>
                        <p
                            className={cx('tool')}
                            onClick={() =>
                                requireAuthFn(
                                    isAuthentication,
                                    () => setIsShowReplyInput(true),
                                    () => {
                                        dispatch(
                                            addToast(
                                                createToast({
                                                    type: 'warning',
                                                    content: 'Bạn cần đăng nhập để trả lời bình luận này',
                                                }),
                                            ),
                                        );
                                    },
                                )
                            }
                        >
                            {`${comment.replies_count > 0 ? comment.replies_count : ''} Replies`}
                        </p>

                        <span className={cx('dot')}></span>
                        <p className={cx('tool', 'no-hover')}>{calculateTime(comment?.created_at)}</p>
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
            {comment.replies_count > 0 && (
                <div className={cx('label')} onClick={handleClickSeeMore}>
                    {!comment.isSeeMore && <span className={cx('label-text')}>Xem phản hồi</span>}
                    {!comment.isSeeMore && <BiChevronDown className={cx('down-icon')} />}
                    {loading && <SpinnerLoader small />}
                </div>
            )}

            <div className={cx('comments')}>
                {comment.replies_count > 0 && comment.isSeeMore && (
                    <>
                        {comment.replies?.map((comment) => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                contextId={contextId}
                                level={level + 1}
                                onDelete={() => handleDelete(comment.id)}
                            ></Comment>
                        ))}
                        {comment.replies_count > comment.replies.length && (
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
