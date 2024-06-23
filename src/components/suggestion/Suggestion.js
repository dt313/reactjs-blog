import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import styles from './Suggestion.module.scss';
import SuggestItem from './SuggestItem';
import { articleService } from '~/services';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);
function Suggestion({ topics, author, postId, className }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const resetTopics = topics?.length > 0 && topics.map((topic) => topic.name);
            const data = { topics: resetTopics || [], userId: author };
            const result = await articleService.getSuggestion(data);
            if (result?.length > 0) {
                const newSugest = result.filter((p) => p.id !== postId);
                setArticles(newSugest);
            }
        };
        fetchAPI();
    }, [topics, author]);
    return (
        <div className={cx('suggest', className)}>
            <h4 className={cx('text')}>Suggestions</h4>

            <div className={cx('suggest-list')}>
                {articles?.length > 0 &&
                    articles.map((art, index) => {
                        return <SuggestItem key={index} article={art} />;
                    })}
            </div>
        </div>
    );
}

Suggestion.propTypes = {
    topics: PropTypes.array.isRequired,
    author: PropTypes.string.isRequired,
};

Suggestion.defaultProps = {
    topics: [],
    author: '',
};
export default memo(Suggestion);
