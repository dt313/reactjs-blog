import { useState, useCallback, useEffect } from 'react';
import styles from './SearchPage.module.scss';
import classNames from 'classnames/bind';
import Search from '~/components/search';
import TopicItem from './TopicItem';
import Article from '~/components/article';
import Pagination from '~/components/pagination';
import { cards, searchTag } from '~/config/uiConfig';
import { useSearchParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function SearchPage() {
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState('Nổi bật');

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({ tag: searchTag[0].tag });
    }, []);
    const handleClickTopic = useCallback(
        (nav) => {
            const idx = searchTag.findIndex((item) => item.tag === nav.tag);
            setSearchParams({ tag: searchTag[idx].tag });
        },
        [topic],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Tìm kiếm câu trả lời hữu ích</h2>
                    <div className={cx('search')}>
                        <Search value={searchValue} setValue={setSearchValue} />
                    </div>
                </div>
                <div className={cx('line')}>
                    <div className={cx('topic-list')}>
                        {searchTag.map((nav, index) => {
                            return (
                                <TopicItem
                                    key={index}
                                    topic={nav.name}
                                    onClickTopic={() => handleClickTopic(nav)}
                                    active={searchParams.get('tag') === nav.tag}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className={cx('list')}>
                    {!loading ? (
                        cards.length > 0 ? (
                            cards.map((card, index) => {
                                return <Article key={index} className={cx('card')} article={card}></Article>;
                            })
                        ) : (
                            <p>No posts</p>
                        )
                    ) : (
                        <div className={cx('loading')}>{/* <Loading /> */} Loading...</div>
                    )}
                </div>

                <div className={cx('pagination')}>
                    <Pagination value={page} setValue={setPage} />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
