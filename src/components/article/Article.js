import { useNavigate } from 'react-router-dom';
import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/image';
import ArticleHeader from './ArticleHeader';
import { BiSolidLike, BiSolidComment } from 'react-icons/bi';
import { bookmarkService } from '~/services';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import calculateTime from '~/helper/calculateTime';
import isConfictAuthor from '~/helper/isConflictAuthor';

const cx = classNames.bind(styles);
function Article({ className, content, primary }) {
    const navigate = useNavigate();
    // handle click content
    const handleClickArticle = () => {
        navigate(`/article/${content.slug}`);
    };

    const userId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();
    // handle bookmark
    const handleBookmark = (handleClientMore) => {
        const data = {
            bookmarkTableId: content.id,
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

        // if same author\
        if (isConfictAuthor(content.author.id)) {
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
    const classes = cx('wrapper', { [className]: className, primary });

    return (
        <div className={classes}>
            <ArticleHeader
                author={content?.author}
                postSlug={content?.slug}
                time={calculateTime(content?.publish_at)}
                hasShare
                onBookmark={handleBookmark}
                is_bookmarked={content.is_bookmarked}
            />
            <div className={cx('body')} onClick={handleClickArticle}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>{content?.meta_title || content?.title}</h2>
                    <div className={cx('description')}>{content.description}</div>

                    <div className={cx('statistical')}>
                        <span className={cx('number')}>
                            <BiSolidLike className={cx('icon')} />
                            {content?.reaction_count}
                        </span>
                        <span className={cx('number')}>
                            <BiSolidComment className={cx('icon')} />
                            {content?.comment_count}
                        </span>
                    </div>
                </div>
                {content?.thumbnail && <Image className={cx('blog-img')} alt="image" src={content.thumbnail} />}
            </div>
        </div>
    );
}

export default Article;
