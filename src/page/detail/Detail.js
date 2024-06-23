import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import MarkDown from '~/components/MarkDown';
import Tools from '~/components/tools';
import ArticleHeader from '~/components/article/ArticleHeader';
import Suggestion from '~/components/suggestion';
import Statistical from '~/components/statistical';

import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { articleService, bookmarkService, reactionService } from '~/services';
import checkReaction from '~/helper/checkReaction';
import calculateTime from '~/helper/calculateTime';
import copyTextToClipboard from '~/helper/copyClipboard';
import CommentBox from '~/components/commentBox';

const cx = classNames.bind(styles);

function Detail() {
    const dispatch = useDispatch();
    const [article, setArticle] = useState({});
    const [isShowCommentsBox, setIsShowCommentsBox] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [countOfReaction, setCountOfReaction] = useState();
    const { id } = useParams();
    document.title = article?.title || '';
    const navigate = useNavigate();

    const userId = useSelector((state) => state.auth.userId);
    useEffect(() => {
        const fetchAPI = async () => {
            const result = await articleService.getArticleById(id);
            setArticle(result);
            setCountOfReaction(result?.reactionCount);
        };
        fetchAPI();
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            const isReacted = await reactionService.checkReaction({
                reactionTableType: 'ARTICLE',
                reactionTableId: id,
                userId: userId,
            });
            if (isReacted?.data) {
                setIsLiked(checkReaction(isReacted?.data));
            } else {
                console.log(isReacted);
            }
        };
        fetchAPI();
    }, []);

    // handle click topik
    const handleClickTopic = (topic) => {
        navigate(`/search?topic=${topic}`);
    };

    const handleClickHeart = async (type) => {
        const data = {
            reactionTableId: id,
            reactionTableType: 'ARTICLE',
            type: type,
            reactedUser: userId,
        };

        const result = await reactionService.tongleReaction(data);
        console.log(result);
        if (result?.status === 'OK') {
            setIsLiked(checkReaction(result?.data));
            setCountOfReaction(checkReaction(result?.data) ? countOfReaction + 1 : countOfReaction - 1);
        } else {
            alert(result?.message);
        }
    };
    const handleClickShare = () => {};
    const handleClickLink = () => {
        const path = window.origin + `/article/${article.id}`;
        // copyclipboad
        copyTextToClipboard(path);
        dispatch(
            addToast(
                createToast({
                    type: 'success',
                    content: 'Đã copy link bài viết thành công',
                }),
            ),
        );
    };

    const handleClickCommentButton = () => {
        setIsShowCommentsBox(!isShowCommentsBox);
    };

    const handleCloseCommenBox = () => {
        setIsShowCommentsBox(false);
    };

    // handle bookmark
    const handleBookmark = (handleClientMore) => {
        const data = {
            bookmarkTableId: id,
            bookmarkTableType: 'ARTICLE',
            bookmarkedUser: userId,
        };
        // fetchAPI to server
        const fetchAPI = async () => {
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

        fetchAPI();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('tools')}>
                    <Tools
                        className={cx('article-tools')}
                        onClickComment={handleClickCommentButton}
                        onClickHeart={() => handleClickHeart('LIKE')}
                        onClickShare={handleClickShare}
                        onClickLink={handleClickLink}
                        is_liked={isLiked}
                    />
                </div>
                <div className={cx('md-editor')}>
                    <h1 className={cx('title')}>{article?.title}</h1>
                    <div className={cx('article-header')}>
                        <ArticleHeader
                            time={calculateTime(article?.updatedAt)}
                            className={cx('header')}
                            type="article"
                            large
                            author={article?.author}
                            postId={id}
                            onBookmark={handleBookmark}
                        />
                    </div>
                    <div>
                        <MarkDown className={cx('preview')} text={article?.content} />
                    </div>
                    <div className={cx('statistical')}>
                        <Statistical like={countOfReaction} comment={article?.commentCount} isLiked={isLiked} />
                    </div>
                    <div className={cx('topics')}>
                        <h5 className={cx('topics-title')}>Topics : </h5>

                        {article?.topics?.map((topic, index) => {
                            return (
                                <span key={index} className={cx('topic')} onClick={() => handleClickTopic(topic?.name)}>
                                    {topic?.name}
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
                                <CommentBox commentCount={article?.commentCount} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Suggestion
                className={cx('suggestion')}
                topics={article?.topics}
                author={article?.author?.id}
                postId={article?.id}
            />
        </div>
    );
}

export default Detail;
