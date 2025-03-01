import PropTypes from 'prop-types';
import { useState, useEffect, useRef, memo, useCallback, useId } from 'react';
import styles from './CommentBox.module.scss';
import classNames from 'classnames/bind';
import { COMMENT_PAGE_SIZE } from '~/config/uiConfig';
import CommentInput from '~/components/commentInput';
import { SpinnerLoader } from '~/components/loading/Loading';
import { commentService } from '~/services';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import setError from '~/helper/setError';
import Comment from '../comment';
import { FaArrowUp } from 'react-icons/fa';

import { addComment, deleteComment, initCommentTree, loadMoreComment } from '~/redux/actions/commentAction';
import { sendNotificationWithCondition } from '~/socket';
import { notificationType, tableType } from '~/config/types';

const cx = classNames.bind(styles);

function CommentBox({ commentCount, authorId, articleId, decreaseCountOfComments, increaseCountOfComments }) {
    const { userId } = useSelector((state) => state.auth);
    const { childrens: tree, page } = useSelector((state) => state.comment);
    const [isShowInput, setIsShowInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showGoToTop, setShowGoToTop] = useState(false);

    const dispatch = useDispatch();
    const { slug } = useParams();
    const { id } = useSelector((state) => state.comment);
    const commentListRef = useRef(null);

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
                        onDelete={handleDeleteComment}
                    ></Comment>
                );
            });
        } else {
            return !loading && <p className={cx('no-comment')}>Chưa có bình luận</p>;
        }
    };

    const handleComment = useCallback(
        async (content) => {
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
        [articleId, userId],
    );

    const handleDeleteComment = useCallback(async (id) => {
        try {
            await commentService.deleteComment(id);
            dispatch(deleteComment(id));
            decreaseCountOfComments();
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
    }, []);

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

    const handleScroll = () => {
        if (commentListRef.current) {
            const { scrollTop } = commentListRef.current;
            setShowGoToTop(scrollTop > 400);
        }
    };

    const handleGoToTop = () => {
        if (commentListRef.current) {
            commentListRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (commentListRef.current) {
            commentListRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (commentListRef.current) {
                commentListRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const showInputBox = useCallback(() => {
        setIsShowInput(true);
    }, []);

    const hideInputBox = useCallback(() => {
        setIsShowInput(false);
    }, []);

    return (
        <div className={cx('wrapper')} ref={commentListRef}>
            <div className={cx('comments-count')}>
                {<SpinnerLoader small /> && `${commentCount} Comments`}
                <p className={cx('comments-des')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
            </div>

            <div className={cx('comment-block')}>
                <div className={cx('comment-input')}>
                    <CommentInput
                        placeholder="Viết bình luận của bạn..."
                        isShow={isShowInput}
                        onCloseInput={hideInputBox}
                        onOpenInput={showInputBox}
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

                    {!loading && commentCount > page * COMMENT_PAGE_SIZE && (
                        <p className={cx('see-more')} onClick={handleLoadMoreComment}>
                            Xem thêm bình luận
                        </p>
                    )}
                </div>

                {showGoToTop && (
                    <div className={cx('st-btn')} onClick={handleGoToTop}>
                        <FaArrowUp />
                    </div>
                )}
            </div>
        </div>
    );
}

CommentBox.propTypes = {
    commentCount: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired,
    articleId: PropTypes.number.isRequired,
    decreaseCountOfComments: PropTypes.func.isRequired,
    increaseCountOfComments: PropTypes.func.isRequired,
};

export default memo(CommentBox);
