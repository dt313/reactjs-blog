import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Suggestion.module.scss';
import Image from '~/components/image';
import { memo } from 'react';
const cx = classNames.bind(styles);
function SuggestItem({ article }) {
    const handleClick = () => {
        window.open(`/article/${article.slug}`, '_blank');
    };
    return (
        <div className={cx('suggest-item')} onClick={handleClick}>
            {article?.thumbnail ? (
                <Image className={cx('suggest-book')} src={article?.thumbnail} />
            ) : (
                <div className={cx('image-fake')} data-content={article?.author.name || article?.author.username}></div>
            )}
            <p className={cx('suggest-title')}>{article?.title}</p>
        </div>
    );
}

SuggestItem.propTypes = {
    article: PropTypes.object.isRequired,
};

export default memo(SuggestItem);
