import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/image';
import ArticleHeader from './ArticleHeader';
import { BiSolidLike, BiSolidComment } from 'react-icons/bi';
import { bookmarkService, commentService, reactionService } from '~/services';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import calculateTime from '~/helper/calculateTime';
import getTableType from '~/helper/getTableType';

const cx = classNames.bind(styles);
function Article({ classes, content, type }) {
    const navigate = useNavigate();
    // handle click content
    const handleClickArticle = () => {
        navigate(`/${type}/${content.id}`);
    };

    const userId = useSelector((state) => state.auth.userId);
    const dispatch = useDispatch();
    // handle bookmark
    const handleBookmark = (handleClientMore) => {
        const data = {
            bookmarkTableId: content.id,
            bookmarkTableType: getTableType(type),
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
        <div className={cx('wrapper', classes)}>
            <ArticleHeader
                author={content?.author}
                postId={content?.id}
                type={type}
                time={calculateTime(content?.updatedAt)}
                hasShare
                onBookmark={handleBookmark}
            />
            <div className={cx('body')} onClick={handleClickArticle}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>{content?.metaTitle || content?.title}</h2>
                    <div className={cx('description')}>{content?.description || content?.content}</div>

                    <div className={cx('statistical')}>
                        <span className={cx('number')}>
                            <BiSolidLike className={cx('icon')} />
                            {content?.reactionCount}
                        </span>
                        <span className={cx('number')}>
                            <BiSolidComment className={cx('icon')} />
                            {content?.commentCount}
                        </span>
                    </div>
                </div>
                {content?.thumbnail && <Image className={cx('blog-img')} alt="image" />}
            </div>
        </div>
    );
}

export default Article;
