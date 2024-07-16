import classNames from 'classnames/bind';
import styles from './Question.module.scss';
import Tools from '~/components/tools';
import MarkDown from '~/components/MarkDown';
import ArticleHeader from '~/components/article/ArticleHeader';
import Statistical from '~/components/statistical';
import CommentInput from '~/components/commentInput';
import { useEffect, useState } from 'react';
import useTitle from '~/hook/useTitle';
import { bookmarkService, commentService, questionService, reactionService } from '~/services';
import { useNavigate, useParams } from 'react-router-dom';
import calculateTime from '~/helper/calculateTime';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import getTableType from '~/helper/getTableType';
import { COMMENT_PAGE_SIZE } from '~/config/uiConfig';
import Comment from '~/components/comment';
import { addComment, deleteComment, initCommentTree, loadMoreComment } from '~/redux/actions/commentAction';
import checkReaction from '~/helper/checkReaction';
import { notificationType, tableType } from '~/config/types';
import { sendNotification } from '~/socket';

const cx = classNames.bind(styles);
function Question() {
    useTitle('Question');
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { id } = useParams();
    const userId = useSelector((state) => state.auth.userId);

    const [isShowInput, setIsShowInput] = useState(false);
    const [question, setQuestion] = useState({});
    const [countOfComments, setCountOfComments] = useState(0);
    const [isReated, setIsReacted] = useState(false);
    const [countOfReaction, setCountOfReaction] = useState(0);
    const { childrens: tree, page } = useSelector((state) => state.comment);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await questionService.getById(id);
            setQuestion(result);
            setCountOfComments(result.commentCount);
            setIsReacted(result.is_reacted);
            setCountOfReaction(result.reactionCount);
        };

        fetchAPI();
    }, [id]);

    useEffect(() => {
        const fetchAPI = async () => {
            const data = {
                type: 'QUESTION',
                id: id,
                pageNumber: page,
                pageSize: COMMENT_PAGE_SIZE,
            };
            const result = await commentService.getAllCommentByType(data);
            dispatch(initCommentTree(id, result));
        };

        fetchAPI();
    }, [id]);

    // handle click heart
    const handleClickHeart = async (type) => {
        const data = {
            reactionTableId: id,
            reactionTableType: 'QUESTION',
            type: type,
            reactedUser: userId,
        };

        const result = await reactionService.tongleReaction(data);
        if (result?.status === 'OK') {
            setIsReacted(checkReaction(result?.data));
            sendNotification({
                sender: userId,
                type: notificationType.react_question,
                receiver: question.author.id,
                contextType: tableType.question,
                contextId: id,
                directObjectType: tableType.question,
                directObjectId: id,
            });
            setCountOfReaction(checkReaction(result?.data) ? countOfReaction + 1 : countOfReaction - 1);
        } else {
            alert(result?.message);
        }
    };

    // handle bookmark
    const handleBookmark = async (handleClientMore) => {
        const data = {
            bookmarkTableId: id,
            bookmarkTableType: getTableType('question'),
            bookmarkedUser: userId,
        };

        const result = await bookmarkService.toggleBookmark(data);
        if (result?.status === 'OK') {
            handleClientMore(result.data);
        } else {
            dispatch(
                addToast(
                    createToast({
                        type: 'warning',
                        content: 'Bạn không thể lưu bài viết của bạn !',
                    }),
                ),
            );
        }
    };

    // handle comment on question
    const handleComment = async (content) => {
        const data = {
            commentableId: id,
            publisher: userId,
            commentType: 'QUESTION',
            content,
        };

        const result = await commentService.createComment(data);
        dispatch(addComment(result));
        sendNotification({
            sender: userId,
            type: notificationType.comment_question,
            receiver: question.author.id,
            contextType: tableType.question,
            contextId: id,
            directObjectType: tableType.comment,
            directObjectId: result.id,
        });
        setCountOfComments(countOfComments + 1);
    };

    const handleDeleteComment = async (id) => {
        const result = await commentService.deleteComment(id);
        if (result?.status === 'OK') {
            dispatch(deleteComment(id));
            setCountOfComments(countOfComments - 1);
        }
    };

    const handleLoadMoreComment = async () => {
        const data = {
            type: 'QUESTION',
            id: id,
            pageNumber: page + 1,
            pageSize: COMMENT_PAGE_SIZE,
        };
        const result = await commentService.getAllCommentByType(data);
        dispatch(loadMoreComment(result));
    };

    const handleClickTopic = (topic) => {
        navigator(`/search?tag=question&&topic=${topic}`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {/* <div className={cx('tools')}>
                    <Tools />
                </div> */}
                <div className={cx('ask-block')}>
                    <div className={cx('ask')}>
                        <ArticleHeader
                            large
                            author={question?.author}
                            time={calculateTime(question?.createdAt)}
                            postId={id}
                            type="question"
                            onBookmark={handleBookmark}
                            is_bookmarked={question?.is_bookmarked}
                            className={cx('ask-header')}
                        />
                        <MarkDown text={question?.content}></MarkDown>
                    </div>

                    <Statistical
                        like={countOfReaction || 0}
                        comment={countOfComments || 0}
                        className={cx('statistical')}
                        around
                        liked={isReated}
                        onClickLike={() => handleClickHeart('LIKE')}
                        onClickComment={() => setIsShowInput(true)}
                    />

                    <div className={cx('topics')}>
                        <h5 className={cx('topics-title')}>Topics : </h5>

                        {question?.topics?.map((topic, index) => {
                            return (
                                <span key={index} className={cx('topic')} onClick={() => handleClickTopic(topic?.name)}>
                                    {topic?.name}
                                </span>
                            );
                        })}
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
                            {tree.map((comment) => (
                                <Comment
                                    className={cx('comment')}
                                    key={comment.id}
                                    comment={comment}
                                    level={0}
                                    onDelete={() => handleDeleteComment(comment.id)}
                                ></Comment>
                            ))}

                            {question.commentCount > page * COMMENT_PAGE_SIZE && (
                                <p className={cx('see-more')} onClick={handleLoadMoreComment}>
                                    Xem thêm bình luận
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
