import { useState, useEffect } from 'react';
import styles from './CommentBox.module.scss';
import classNames from 'classnames/bind';
import { COMMENT_PAGE_SIZE } from '~/config/uiConfig';
import CommentInput from '~/components/commentInput';
import { SpinnerLoader } from '~/components/loading/Loading';
import { commentService } from '~/services';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';

import Comment from '../comment';

import { addComment, deleteComment, initCommentTree, loadMoreComment } from '~/redux/actions/commentAction';
import { sendNotificationWithCondition } from '~/socket';
import { notificationType, tableType } from '~/config/types';

const cx = classNames.bind(styles);

function CommentBox({ commentCount, authorId, articleId }) {
    const { userId } = useSelector((state) => state.auth);
    const { childrens: tree, page } = useSelector((state) => state.comment);
    const dispatch = useDispatch();
    const [isShowInput, setIsShowInput] = useState(false);
    const [countOfComments, setCountOfComment] = useState(commentCount);
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    const { id } = useSelector((state) => state.comment);

    useEffect(() => {
        const fetchAPI = async () => {
            const data = {
                type: 'ARTICLE',
                id: articleId,
                pageNumber: page,
                pageSize: COMMENT_PAGE_SIZE,
            };
            try {
                setLoading(true);
                const result = await commentService.getAllCommentByType(data);
                dispatch(initCommentTree(articleId, result));
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

        if (id !== articleId) {
            fetchAPI();
        }
    }, [slug]);

    const renderComments = () => {
        if (tree.length > 0) {
            return tree?.map((comment, index) => {
                return (
                    <Comment
                        className={cx('comment')}
                        key={comment.id}
                        comment={comment}
                        contextId={articleId}
                        level={0}
                        onDelete={() => handleDeleteComment(comment.id)}
                    ></Comment>
                );
            });
        } else {
            return <p className={cx('no-comment')}>Chưa có bình luận</p>;
        }
    };

    const handleComment = async (content) => {
        try {
            const result = await commentService.createComment({
                commentableId: articleId,
                publisher: userId,
                commentType: 'ARTICLE',
                content,
            });
            dispatch(addComment(result));
            sendNotificationWithCondition(userId !== authorId, {
                sender: userId,
                type: notificationType.comment_article,
                receiver: authorId,
                contextType: tableType.article,
                contextId: articleId,
                directObjectType: tableType.comment,
                directObjectId: result.id,
            });
            increaseCountOfComments();
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

    const handleDeleteComment = async (id) => {
        try {
            await commentService.deleteComment(id);
            dispatch(deleteComment(id));
            decreaseCountOfComments();
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

    const handleLoadMoreComment = async () => {
        const data = {
            type: 'ARTICLE',
            id: articleId,
            pageNumber: page + 1,
            pageSize: COMMENT_PAGE_SIZE,
        };
        try {
            const result = await commentService.getAllCommentByType(data);
            dispatch(loadMoreComment(result));
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

    const decreaseCountOfComments = () => {
        setCountOfComment(countOfComments - 1);
    };

    const increaseCountOfComments = () => {
        setCountOfComment(countOfComments + 1);
    };

    return (
        <>
            <div className={cx('comments-count')}>
                {<SpinnerLoader small /> && `${countOfComments} Comments`}
                <p className={cx('comments-des')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
            </div>

            <div className={cx('comment-block')}>
                <div className={cx('comment-input')}>
                    <CommentInput
                        placeholder="Viết bình luận của bạn..."
                        isShow={isShowInput}
                        onCloseInput={() => setIsShowInput(false)}
                        onOpenInput={() => setIsShowInput(true)}
                        onComment={handleComment}
                    />
                </div>
                <div className={cx('comment-list')}>
                    {loading && (
                        <div className={cx('loading-wrap')}>
                            <SpinnerLoader small={true} />
                        </div>
                    )}
                    {renderComments()}

                    {commentCount > page * COMMENT_PAGE_SIZE && (
                        <p className={cx('see-more')} onClick={handleLoadMoreComment}>
                            Xem thêm bình luận
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default CommentBox;
