import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './CommentBox.module.scss';
import classNames from 'classnames/bind';
import { COMMENT_PAGE_SIZE } from '~/config/uiConfig';
import CommentInput from '~/components/commentInput';
import { SpinnerLoader } from '~/components/loading/Loading';
import { commentService } from '~/services';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../comment';
import convertDataToTree from '~/helper/convertDataToTree';
import { comments } from '~/config/comments';
import { addComment, deleteComment, initCommentTree, loadMoreComment } from '~/redux/actions/commentAction';
import { sendNotification } from '~/socket';
import { notificationType, tableType } from '~/config/types';

const cx = classNames.bind(styles);

function CommentBox({ commentCount, authorId }) {
    const { id } = useParams();
    const userId = useSelector((state) => state.auth.userId);
    const { childrens: tree, page } = useSelector((state) => state.comment);
    const dispatch = useDispatch();
    const [isShowInput, setIsShowInput] = useState(false);
    const [countOfComments, setCountOfComment] = useState(commentCount);

    useEffect(() => {
        const fetchAPI = async () => {
            const data = {
                type: 'ARTICLE',
                id: id,
                pageNumber: page,
                pageSize: COMMENT_PAGE_SIZE,
            };
            const result = await commentService.getAllCommentByType(data);
            dispatch(initCommentTree(id, result));
        };

        fetchAPI();
    }, [id]);

    const renderComments = () => {
        return tree?.map((comment, index) => {
            return (
                <Comment
                    className={cx('comment')}
                    key={comment.id}
                    comment={comment}
                    level={0}
                    onDelete={() => handleDeleteComment(comment.id)}
                ></Comment>
            );
        });
    };

    const handleComment = async (content) => {
        const result = await commentService.createComment({
            commentableId: id,
            publisher: userId,
            commentType: 'ARTICLE',
            content,
        });
        dispatch(addComment(result));
        sendNotification({
            sender: userId,
            type: notificationType.comment_article,
            receiver: authorId,
            contextType: tableType.article,
            contextId: id,
            directObjectType: tableType.comment,
            directObjectId: result.id,
        });
        increaseCountOfComments();
    };

    const handleDeleteComment = async (id) => {
        const result = await commentService.deleteComment(id);
        if (result?.status === 'OK') {
            dispatch(deleteComment(id));
            decreaseCountOfComments();
        }
    };

    const handleLoadMoreComment = async () => {
        const data = {
            type: 'ARTICLE',
            id: id,
            pageNumber: page + 1,
            pageSize: COMMENT_PAGE_SIZE,
        };
        const result = await commentService.getAllCommentByType(data);
        dispatch(loadMoreComment(result));
    };

    const decreaseCountOfComments = () => {
        setCountOfComment(countOfComments - 1);
    };

    const increaseCountOfComments = () => {
        setCountOfComment(countOfComments + 1);
    };

    return (
        <div>
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
                    {renderComments()}

                    {commentCount > page * COMMENT_PAGE_SIZE && (
                        <p className={cx('see-more')} onClick={handleLoadMoreComment}>
                            Xem thêm bình luận
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommentBox;
