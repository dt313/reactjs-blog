import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/image';
import { useNavigate } from 'react-router-dom';
import ArticleHeader from './ArticleHeader';
import { BiSolidLike, BiSolidComment } from 'react-icons/bi';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Article({ classes, article }) {
    const navigate = useNavigate();

    // handle click article
    const handleClickArticle = () => {
        navigate(`/article/${article.aid}`);
    };

    return (
        <div className={cx('wrapper', classes)}>
            <ArticleHeader username={article?.username} avatar={article?.avatar} author={article?.author} />
            <div className={cx('body')} onClick={handleClickArticle}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>{article?.title}</h2>
                    <div className={cx('description')}>{article?.description}</div>

                    <div className={cx('statistical')}>
                        <span className={cx('number')}>
                            <BiSolidLike className={cx('icon')} />
                            {article?.like}
                        </span>
                        <span className={cx('number')}>
                            <BiSolidComment className={cx('icon')} />
                            {article?.comment}
                        </span>
                    </div>
                </div>
                {article?.thumbnail && <Image className={cx('blog-img')} src={article?.thumbnail} alt="image" />}
            </div>
        </div>
    );
}

export default Article;
