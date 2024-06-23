import classNames from 'classnames/bind';
import styles from './AskBox.module.scss';
import Tools from '~/components/tools';
import MarkDown from '~/components/MarkDown';
import ArticleHeader from '~/components/article/ArticleHeader';
import Statistical from '~/components/statistical';
import CommentInput from '~/components/commentInput';
import Comments from '~/components/comments';
import { useEffect, useState } from 'react';
import useTitle from '~/hook/useTitle';
import { bookmarkService, commentService, questionService } from '~/services';
import { useParams } from 'react-router-dom';
import calculateTime from '~/helper/calculateTime';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import getTableType from '~/helper/getTableType';
import { COMMENT_PAGE_SIZE } from '~/config/uiConfig';

const cx = classNames.bind(styles);
function AskBox() {
    useTitle('Question');

    const [isInput, setIsInput] = useState(false);
    const [question, setQuestion] = useState({});
    const [commentOfQuestion, setCommentOfQuestion] = useState([]);
    const [countOfComment, setCountOfComment] = useState([]);
    const [commentPage, setCommentPage] = useState(1);

    const { id } = useParams();
    const userId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await questionService.getById(id);
            setQuestion(result);
        };

        fetchAPI();
    }, []);

    useEffect(() => {
        const data = { type: 'QUESTION', id: id, pageNumber: commentPage, pageSize: COMMENT_PAGE_SIZE };
        const fetchAPI = async () => {
            const result = await commentService.getAllCommentByType(data);
            if (commentPage === 1) {
                setCommentOfQuestion(result);
            } else {
                setCommentOfQuestion((pre) => [...pre, ...result]);
            }
        };
        fetchAPI();
    }, [commentPage]);

    // handle bookmark
    const handleBookmark = async (handleClientMore) => {
        const data = {
            bookmarkTableId: id,
            bookmarkTableType: getTableType('question'),
            bookmarkedUser: userId,
        };
        // fetchAPI to server

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
        console.log(result);
        setCommentOfQuestion((pre) => [result, ...pre]);
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
                            className={cx('ask-header')}
                        />
                        <MarkDown text={question?.content}></MarkDown>
                    </div>
                    <Statistical
                        like={question?.reactionCount}
                        comment={question?.commentCount}
                        className={cx('statistical')}
                        around
                    />
                    {/* <span className={cx('separate')}></span> */}
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
                            <Comments
                                list={commentOfQuestion}
                                title={`${countOfComment} Comment`}
                                level={0}
                                hasLoadMore={countOfComment > COMMENT_PAGE_SIZE * commentPage}
                                onClickLoadMore={() => setCommentPage(commentPage + 1)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AskBox;
