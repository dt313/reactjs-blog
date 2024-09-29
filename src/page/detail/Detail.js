import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import MarkDown from '~/components/markdown';
import Tools from '~/components/tools';
import ArticleHeader from '~/components/article/ArticleHeader';
import Suggestion from '~/components/suggestion';
import Statistical from '~/components/statistical';

import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { articleService, bookmarkService, reactionService } from '~/services';
import { sendNotificationWithCondition } from '~/socket';
import calculateTime from '~/helper/calculateTime';
import copyTextToClipboard from '~/helper/copyClipboard';
import CommentBox from '~/components/commentBox';
import { notificationType, tableType } from '~/config/types';
import useTitle from '~/hook/useTitle';
import { open } from '~/redux/actions/shareBoxAction';
import requireAuthFn from '~/helper/requireAuthFn';
import isConfictAuthor from '~/helper/isConflictAuthor';

const cx = classNames.bind(styles);

function Detail() {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [article, setArticle] = useState({});
    const [isShowCommentsBox, setIsShowCommentsBox] = useState(false);
    const [reactionType, setReactionType] = useState(false);
    const [isReacted, setIsReacted] = useState(false);
    const [countOfReaction, setCountOfReaction] = useState();
    const [reactions, setReactions] = useState([]);
    // document.title = article?.title || '';
    useTitle(article?.title || '');
    const navigate = useNavigate();

    const { userId, isAuthentication } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const result = await articleService.getArticleBySlug(slug);
                setArticle(result);
                setCountOfReaction(result?.reaction_count);
                setIsReacted(result?.is_reacted);
                setReactionType(result?.reacted_type);
                setReactions(result?.reactions);
                setIsShowCommentsBox(!!searchParams.get('direct_id'));
            } catch (error) {
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: error.message,
                        }),
                    ),
                );
            }
        };

        fetchAPI();
    }, [searchParams, slug, dispatch]);

    // handle click topik
    const handleClickTopic = (topic) => {
        navigate(`/search?tag=article&&topic=${topic}`);
    };

    const handleClickHeart = async (type) => {
        console.log(type);
        const data = {
            reactionTableId: article.id,
            reactionTableType: 'ARTICLE',
            type: type,
            reactedUser: userId,
        };
        try {
            if (type !== reactionType) {
                const result = await reactionService.tongleReaction(data);

                setReactionType(result?.data?.type || 'NULL');

                // increase reaction count and reset isReacted
                if (reactionType === 'NULL' && type !== 'NULL') {
                    setCountOfReaction(countOfReaction + 1);
                    setIsReacted(true);
                    setReactions((pre) => [...pre, result.data]);
                } else if (reactionType !== 'NULL' && type === 'NULL') {
                    setCountOfReaction(countOfReaction - 1);
                    setIsReacted(false);
                    const newReaction = reactions.filter((r) => r.reacted_user.id !== userId);
                    setReactions(newReaction);
                } else {
                    let newReaction = reactions.filter((r) => r.id !== result.data.id);
                    setReactions(() => [...newReaction, result.data]);
                }

                // send notification
                sendNotificationWithCondition(isReacted === false && type !== 'NULL' && userId !== article.author.id, {
                    sender: userId,
                    type: notificationType.react_article,
                    receiver: article.author.id,
                    contextType: tableType.article,
                    contextId: article.id,
                    directObjectType: tableType.article,
                    directObjectId: article.id,
                });
            }
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

    const handleClickShare = () => {
        dispatch(open());
    };

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
        setSearchParams('');
        setIsShowCommentsBox(false);
    };

    // handle bookmark
    const handleBookmark = (handleClientMore) => {
        const data = {
            bookmarkTableId: article.id,
            bookmarkTableType: 'ARTICLE',
            bookmarkedUser: userId,
        };
        // fetchAPI to server
        const fetchAPI = async () => {
            try {
                const result = await bookmarkService.toggleBookmark(data);
                handleClientMore(result.data);
            } catch (error) {
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: error.message,
                        }),
                    ),
                );
            }
        };

        if (isConfictAuthor(article.author.id)) {
            fetchAPI();
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('tools')}>
                    <Tools
                        className={cx('article-tools')}
                        onClickComment={handleClickCommentButton}
                        onClickHeart={(type) =>
                            requireAuthFn(
                                isAuthentication,
                                () => handleClickHeart(type),
                                () => {
                                    dispatch(
                                        addToast(
                                            createToast({
                                                type: 'warning',
                                                content: 'Bạn cần đăng nhập để thích bài viết này',
                                            }),
                                        ),
                                    );
                                    // navigate('/login?continue=');
                                },
                            )
                        }
                        onClickShare={handleClickShare}
                        onClickLink={handleClickLink}
                        reactionType={reactionType}
                    />
                </div>
                <div className={cx('md-editor')}>
                    <h1 className={cx('title')}>{article?.title}</h1>
                    <div className={cx('article-header')}>
                        <ArticleHeader
                            time={calculateTime(article?.updated_at)}
                            className={cx('header')}
                            type="article"
                            large
                            author={article?.author}
                            is_bookmarked={article?.is_bookmarked}
                            postSlug={article?.slug}
                            onBookmark={handleBookmark}
                        />
                    </div>
                    <div>
                        <MarkDown className={cx('preview')} text={article?.content} />
                    </div>
                    <div className={cx('statistical')}>
                        <Statistical
                            like={countOfReaction}
                            comment={article?.comment_count}
                            liked={isReacted}
                            likedUsers={reactions}
                            onClickComment={() => setIsShowCommentsBox(true)}
                        />
                    </div>
                    {article.topics?.length > 0 && (
                        <div className={cx('topics')}>
                            <h5 className={cx('topics-title')}>Topics : </h5>

                            {article?.topics?.map((topic, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={cx('topic')}
                                        onClick={() => handleClickTopic(topic?.name)}
                                    >
                                        {topic?.name}
                                    </span>
                                );
                            })}
                        </div>
                    )}
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
                                <CommentBox
                                    commentCount={article?.comment_count}
                                    authorId={article.author.id}
                                    articleId={article.id}
                                />
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
