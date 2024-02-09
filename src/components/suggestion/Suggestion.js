import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import styles from './Suggestion.module.scss';
import SuggestItem from './SuggestItem';

const cx = classNames.bind(styles);
function Suggestion({ topics, author, className }) {
    const sample = [
        {
            title: 'Suggestions for the following',
            thumbnail: 'https://www.freecodecamp.org/news/content/images/size/w2000/2023/01/javascript-one-liner.png',
        },
        {
            title: 'Suggestions for the following',
            thumbnail: 'https://www.freecodecamp.org/news/content/images/size/w2000/2023/01/javascript-one-liner.png',
        },
        {
            title: 'Suggestions for the following',
            thumbnail: 'https://www.freecodecamp.org/news/content/images/size/w2000/2023/01/javascript-one-liner.png',
        },
    ];
    const [blogs, setBlogs] = useState([]);

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         const result = await blogService.suggestBlogs({ topic: topics, author: author });
    //         setBlogs(result);
    //     };
    //     fetchAPI();
    // }, [topics, author]);
    return (
        <div className={cx('suggest', className)}>
            <h4 className={cx('text')}>Suggestions</h4>

            <div className={cx('suggest-list')}>
                {sample.map((blog, index) => {
                    return <SuggestItem key={index} article={blog} />;
                })}
            </div>
        </div>
    );
}

export default memo(Suggestion);
