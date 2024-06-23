import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './CommentBox.module.scss';
import classNames from 'classnames/bind';
import { COMMENT_PAGE_SIZE } from '~/config/uiConfig';
import CommentInput from '~/components/commentInput';
import Comments from '~/components/comments';
import { SpinnerLoader } from '~/components/loading/Loading';
import { commentService } from '~/services';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Comment from '../comment';

const cx = classNames.bind(styles);

function CommentBox({ commentCount }) {
    const [commentOfPost, setCommentOfPost] = useState([]);
    const [commentPageNumber, setCommentPageNumber] = useState(1);
    const [countOfComment, setCountOfComment] = useState(0);
    const [isInput, setIsInput] = useState(false);
    const [hasLoadMore, setHasLoadMore] = useState(commentCount > commentPageNumber * COMMENT_PAGE_SIZE);
    const { id } = useParams();
    const userId = useSelector((state) => state.auth.userId);

    console.log(countOfComment, commentPageNumber * COMMENT_PAGE_SIZE, hasLoadMore);
    const handleComment = async (content) => {
        const data = {
            commentableId: id,
            publisher: userId,
            commentType: 'ARTICLE',
            content,
        };

        const result = await commentService.createComment(data);
        setCommentOfPost((pre) => [result, ...pre]);
        setCountOfComment(countOfComment + 1);
    };

    const handleLoadMoreComment = () => {
        setHasLoadMore(countOfComment > (commentPageNumber + 1) * COMMENT_PAGE_SIZE);
        setCommentPageNumber(commentPageNumber + 1);
    };

    // FETCH COMMENT
    useEffect(() => {
        const data = { type: 'ARTICLE', id: id, pageNumber: commentPageNumber, pageSize: COMMENT_PAGE_SIZE };
        const fetchAPI = async () => {
            const result = await commentService.getAllCommentByType(data);
            if (commentPageNumber === 1) {
                setCommentOfPost(result);
            } else {
                setCommentOfPost((pre) => [...pre, ...result]);
            }
        };
        fetchAPI();
    }, [commentPageNumber]);

    const handleDelete = (id) => {
        const newPosts = commentOfPost.filter((post) => post.id !== id);
        setCommentOfPost(newPosts);
        setCountOfComment(countOfComment - 1);
    };

    console.log(commentOfPost);

    return (
        <div>
            <div className={cx('comments-count')}>
                {<SpinnerLoader small /> && `${countOfComment} Comments`}
                <p className={cx('comments-des')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
            </div>

            <div className={cx('comment-block')}>
                <div className={cx('comment-input')}>
                    <CommentInput
                        placeholder="Viết bình luận của bạn..."
                        isShow={isInput}
                        setIsShow={setIsInput}
                        onComment={handleComment}
                    />
                </div>
                <div className={cx('comment-list')}>
                    {commentOfPost.map((comment, index) => {
                        return (
                            <Comment
                                className={cx('comment')}
                                key={index}
                                comment={comment}
                                level={0}
                                onDelete={handleDelete}
                            ></Comment>
                        );
                    })}

                    {hasLoadMore && (
                        <p className={cx('see-more')} onClick={handleLoadMoreComment}>
                            Xem thêm
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommentBox;
