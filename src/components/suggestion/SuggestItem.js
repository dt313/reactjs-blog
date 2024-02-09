import classNames from 'classnames/bind';
import styles from './Suggestion.module.scss';
import Image from '~/components/image';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
const cx = classNames.bind(styles);
function SuggestItem({ article }) {
    const navigate = useNavigate();
    // const handleClick = () => {
    //     navigate(`/blog/${blog?._id}`);
    // };
    return (
        <div className={cx('suggest-item')}>
            <Image className={cx('suggest-book')} src={article?.thumbnail} />
            <p className={cx('suggest-title')}>{article?.title}</p>
        </div>
    );
}

export default memo(SuggestItem);
