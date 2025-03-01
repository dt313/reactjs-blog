import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/image';
import ArticleHeader from './ArticleHeader';
import { BiSolidLike, BiSolidComment } from 'react-icons/bi';
import { bookmarkService } from '~/services';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import setError from '~/helper/setError';
import calculateTime from '~/helper/calculateTime';
import isConfictAuthor from '~/helper/isConflictAuthor';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { skeletonColors } from '~/config/uiConfig';
import { tokenUtils } from '~/utils';

const cx = classNames.bind(styles);
function Article({ className, content, primary, square }) {
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
    const classes = cx('wrapper', { [className]: className, primary, square });

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

Article.propTypes = {
    className: PropTypes.string,
    content: PropTypes.object.isRequired,
    primary: PropTypes.bool,
    square: PropTypes.bool,
};

Article.Skeleton = function () {
    const theme = tokenUtils.getTheme();

    return (
        <div className={cx('wrapper')}>
            <SkeletonTheme
                baseColor={theme === 'dark' ? skeletonColors[0].base : skeletonColors[1].base}
                highlightColor={theme === 'dark' ? skeletonColors[0].hl : skeletonColors[1].hl}
            >
                <div className={cx('header')}>
                    <Skeleton circle={true} height={40} width={40} />
                    <div className={cx('header-info')}>
                        <Skeleton width={60} />
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('info')}>
                        <Skeleton width="80%" height={30} />
                        <Skeleton count={3} />
                        <div className={cx('statistical')}>
                            <Skeleton width={30} height={20} />
                            <Skeleton width={30} height={20} />
                        </div>
                    </div>
                    <Skeleton height={150} />
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default Article;
