import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Avatar from '../avatar';
import { BiChevronDown } from 'react-icons/bi';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import CommentInput from '../commentInput';
import { SpinnerLoader } from '../loading/Loading';
import MarkDown from '../markdown';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commentService, reactionService } from '~/services';
import { COMMENT_DEPTH, COMMENT_REPLY_PAGE_SIZE } from '~/config/uiConfig';
import calculateTime from '~/helper/calculateTime';
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
import Tippy from '@tippyjs/react/headless';
import Reaction from '../reaction';
import getReactionText from '~/helper/getReactionText';
import ReactionButton from '../reactionButton';
import setError from '~/helper/setError';

const cx = classNames.bind(styles);

function Comment({ contextId, comment, className, level, onDelete = () => {} }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const ref = useRef(null);

    const { userId, isAuthentication } = useSelector((state) => state.auth);
    const [isShowReplyInput, setIsShowReplyInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const { theme } = useSelector((state) => state.color);

    const parent_id = parseInt(searchParams.get('parent_id')) || null;
    const direct_id = parseInt(searchParams.get('direct_id')) || null;

    useEffect(() => {
        if (parent_id && parent_id === comment?.id && comment.isSeeMore === false) {
            handleClickSeeMore();
        }

        if (direct_id && direct_id === comment?.id) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [searchParams]);

    const menuList = [
        {
            title: 'Delete',
            fn: () => onDelete(comment.id),
        },
    ];

    // handle create comment
    const handeComment = useCallback(
        async (content) => {
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
                let err = setError(error);
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: err,
                        }),
                    ),
                );
            }
        },
        [level, comment],
    );

    // handle delete comment
    const handleDelete = useCallback(
        async (id) => {
            try {
                await commentService.deleteComment(id);
                dispatch(deleteReplyComment(comment.id, id));
            } catch (error) {
                let err = setError(error);
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: err,
                        }),
                    ),
                );
            }
        },
        [comment.id, dispatch],
    );

    // load replies comment
    const handleClickSeeMore = async () => {
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
            let err = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: err,
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
            let err = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: err,
                    }),
                ),
            );
        }
    };

    // handle react comment
    const handleReactComment = async (type) => {
        const data = {
            reactionTableId: comment.id,
            reactionTableType: 'COMMENT',
            type: type,
            reactedUser: userId,
        };

        const currentReactionType = comment.reacted_type;
        try {
            if (type !== currentReactionType) {
                const result = await reactionService.tongleReaction(data);
                dispatch(reactionComment(comment.id, result?.data));
                sendNotificationWithCondition(
                    comment.is_reacted === false && type !== 'NULL' && userId !== comment.publisher.id,
                    {
                        sender: userId,
                        type: notificationType.react_comment,
                        receiver: comment.publisher.id,
                        contextType: 'ARTICLE',
                        contextId: contextId,
                        directObjectType: tableType.comment,
                        directObjectId: comment.id,
                    },
                );
            }
        } catch (error) {
            let err = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: err,
                    }),
                ),
            );
        }
    };

    const handleReactCommentWithCondition = (type) => {
        requireAuthFn(
            isAuthentication,
            () => handleReactComment(type),
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
        );
        setVisible(false);
    };

    // Show/Hide reaction tooltip
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isHovering) setVisible(true);
            else setVisible(false);
        }, 700);

        return () => {
            clearTimeout(timeout);
        };
    }, [isHovering]);

    const showInputBox = useCallback(() => {
        setIsShowReplyInput(true);
    }, []);

    const hideInputBox = useCallback(() => {
        setIsShowReplyInput(false);
    }, []);

    return (
        <div id={comment.id} className={cx('wrapper', className)} ref={ref}>
            <div className={cx('container')}>
                <Avatar src={comment?.publisher?.avatar} />
                <div className={cx('comment', { active: parseInt(searchParams.get('direct_id')) === comment?.id })}>
                    <div className={cx('text-box')}>
                        <div className={cx('comment-header')}>
                            <span
                                className={cx('name')}
                                onClick={() => navigate(`/profile/@${comment?.publisher?.username}`)}
                            >
                                {comment?.publisher?.name || comment?.publisher?.username}
                            </span>
                            {userId === comment?.publisher?.id && (
                                <DropMenu offset={[-35, -60]} menu={menuList} width={100}>
                                    <BiDotsHorizontalRounded className={cx('icon')} />
                                </DropMenu>
                            )}
                        </div>
                        <MarkDown className={cx('text')} text={comment?.content}></MarkDown>
                    </div>
                    <div className={cx('tool-box')}>
                        <Tippy
                            placement="top"
                            offset={[100, 0]}
                            interactive
                            visible={visible}
                            onClickOutside={() => setVisible(false)}
                            appendTo={'parent'}
                            render={(attrs) => (
                                <div
                                    className={cx('box')}
                                    tabIndex="1"
                                    {...attrs}
                                    onMouseLeave={() => setIsHovering(false)}
                                    onMouseEnter={() => setIsHovering(true)}
                                >
                                    <Reaction theme={theme} onClick={handleReactCommentWithCondition} />
                                </div>
                            )}
                        >
                            <p
                                className={cx('tool', comment.reacted_type, comment.is_reacted && 'liked')}
                                onMouseEnter={(e) => setIsHovering(true)}
                                onMouseLeave={(e) => setIsHovering(false)}
                                onClick={() =>
                                    handleReactCommentWithCondition(comment.reacted_type === 'NULL' ? 'LIKE' : 'NULL')
                                }
                            >
                                {getReactionText(comment.reacted_type)}
                            </p>
                        </Tippy>
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
                            {`${comment.replies_count > 0 ? comment.replies_count + ' câu trả lời' : 'Trả lời'}`}
                        </p>

                        <span className={cx('dot')}></span>
                        <p className={cx('tool', 'no-hover')}>{calculateTime(comment?.created_at)}</p>
                        {comment.reactions.length > 0 && (
                            <ReactionButton className={cx('reactions-button')} list={comment.reactions} />
                        )}
                    </div>

                    {isShowReplyInput && (
                        <div className={cx('reply-box')}>
                            <CommentInput
                                reply={true}
                                placeholder="Trả lời ở đây"
                                isShow={isShowReplyInput}
                                onCloseInput={hideInputBox}
                                onOpenInput={showInputBox}
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
                                onDelete={handleDelete}
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

Comment.propTypes = {
    contextId: PropTypes.number,
    comment: PropTypes.object.isRequired,
    className: PropTypes.string,
    level: PropTypes.number,
    onDelete: PropTypes.func.isRequired,
};

export default memo(Comment);
