import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import MarkDown from '~/components/MarkDown';
import Tools from '~/components/tools';
import ArticleHeader from '~/components/article/ArticleHeader';
import Suggestion from '~/components/suggestion';
import Statistical from '~/components/statistical';
import CommentInput from '~/components/commentInput';
import Comments from '~/components/comments';
import { comments } from '~/config/comments';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { markdownEX } from '~/config/uiConfig';
import { useNavigate } from 'react-router-dom';
import useTitle from '~/hook/useTitle';
import { useDispatch } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { SpinnerLoader } from '~/components/loading/Loading';
import { v4 as uuidv4 } from 'uuid';
const cx = classNames.bind(styles);

const article = {
    author: 'Honnh Jonh',
    avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
    thumbnail: 'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png',
    title: 'What is Lorem Ipsum?',
    description: markdownEX,
    username: 'danh3',
    like: 10,
    comment: 20,
    topic: ['hello', 'world'],
};

function Detail() {
    useTitle(article.title);
    const dispatch = useDispatch();
    const [isInput, setIsInput] = useState(false);
    const [isShowCommentsBox, setIsShowCommentsBox] = useState(false);
    const [commentOfArticle, setCommentOfArticle] = useState([]);
    const navigate = useNavigate();

    // console.log(commentOfArticle);
    // handle click topik
    const handleClickTopic = (topic) => {
        navigate(`/search?topic=${topic}`);
    };

    const handleClickHeart = () => {};
    const handleClickShare = () => {};
    const handleClickLink = () => {
        // copyclipboad
        dispatch(
            addToast(
                createToast({
                    type: 'success',
                    content: 'Đã copy link bài viết thành công',
                }),
            ),
        );
    };

    const handeComment = (content) => {
        console.log('Handle comment : ', content);
        setCommentOfArticle((pre) => [
            ...pre,
            {
                id: uuidv4(),
                user_id: '328193ybdhad',
                commentable_type: 'POST',
                commentable_id: 1,
                content: content,
                created_at: '10 ngay truoc',
                created_at: '10 ngay truoc',
            },
        ]);
    };
    const handleClickCommentButton = () => {
        setIsShowCommentsBox(!isShowCommentsBox);
    };

    const handleCloseCommenBox = () => {
        setIsShowCommentsBox(false);
        setIsInput(false);
    };

    useEffect(() => {
        const cmtsOfPost = comments.filter((c) => c.commentable_type === 'POST' && c.commentable_id === 1);
        // console.log('REPLY : ', cmtsOfPost);
        setCommentOfArticle(cmtsOfPost);
    }, []);

    // TEST

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('tools')}>
                    <Tools
                        className={cx('article-tools')}
                        onClickComment={handleClickCommentButton}
                        onClickHeart={handleClickHeart}
                        onClickShare={handleClickShare}
                        onClickLink={handleClickLink}
                    />
                </div>
                <div className={cx('md-editor')}>
                    <h1 className={cx('title')}>{article?.title}</h1>
                    <div className={cx('article-header')}>
                        <ArticleHeader
                            time={true}
                            username={article?.username}
                            className={cx('header')}
                            large
                            author={article?.author}
                            avatar={article?.avatar}
                        />
                    </div>
                    <div>
                        <MarkDown className={cx('preview')} text={article?.description} />
                    </div>
                    <div className={cx('statistical')}>
                        <Statistical like={article?.like} comment={article.comment} isLiked={true} />
                    </div>
                    <div className={cx('topics')}>
                        <h5 className={cx('topics-title')}>Topics : </h5>

                        {article?.topic?.map((topic, index) => {
                            return (
                                <span key={index} className={cx('topic')} onClick={() => handleClickTopic(topic)}>
                                    {topic}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {isShowCommentsBox && (
                    <div className={cx('overlay')} onClick={handleCloseCommenBox}>
                        <div
                            className={cx('comments-wrapper')}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <span className={cx('close')}>
                                <MdClose className={cx('close-icon')} onClick={handleCloseCommenBox} />
                            </span>

                            <div className={cx('comments-detail')}>
                                <div className={cx('comments-count')}>
                                    {<SpinnerLoader small /> && '4 Comments'}
                                    <p className={cx('comments-des')}>
                                        (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
                                    </p>
                                </div>

                                <div className={cx('comment-block')}>
                                    <div className={cx('comment-input')}>
                                        <CommentInput
                                            placeholder="Viết bình luận của bạn..."
                                            isShow={isInput}
                                            setIsShow={setIsInput}
                                            onComment={handeComment}
                                        />
                                    </div>
                                    <div className={cx('comment-list')}>
                                        <Comments list={commentOfArticle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Suggestion className={cx('suggestion')} topics={article?.topic} author={article?.author} />
        </div>
    );
}

export default Detail;
