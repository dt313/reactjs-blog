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
            <Image className={cx('suggest-book')} src={article?.thumbnail} />
            <p className={cx('suggest-title')}>{article?.title}</p>
        </div>
    );
}

export default memo(SuggestItem);
