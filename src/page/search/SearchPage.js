import { useState, useCallback, useEffect } from 'react';
import styles from './SearchPage.module.scss';
import classNames from 'classnames/bind';
import Search from '~/components/search';
import TopicItem from './TopicItem';
import Article from '~/components/article';
import Pagination from '~/components/pagination';
import { cards, searchTag } from '~/config/uiConfig';
import { useSearchParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

const cx = classNames.bind(styles);

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState(searchTag[0].tag || '');
    const [topic, setTopic] = useState(searchParams.get('topic') || '');
    let params = {};

    const setParams = ({ tag, topic, q }) => {
        let params = {};
        if (tag !== '' && tag !== undefined) {
            params.tag = tag;
        }
        if (topic !== '' && topic !== undefined) {
            params.topic = topic;
        }
        if (q !== '' && q !== undefined) {
            params.q = q;
        }
        setSearchParams(params);
    };
    useEffect(() => {
        params.tag = searchTag[0].tag;
        params.topic = topic;
        params.q = searchValue;
        setParams(params);
    }, []);

    const handleClickTag = useCallback(
        (nav) => {
            const idx = searchTag.findIndex((item) => item.tag === nav.tag);
            setTag(searchTag[idx].tag);
            params.tag = searchTag[idx].tag;
            params.q = searchValue;
            params.topic = topic;
            console.log(params);
            setParams(params);
        },
        [tag, searchParams],
    );

    // change input
    const handleChangeSearchValue = (e) => {
        const idx = searchTag.findIndex((item) => item.tag === tag);
        params.tag = searchTag[idx].tag;
        params.q = e.target.value;
        params.topic = topic;
        setParams(params);
        setSearchValue(e.target.value);
    };

    // clear input
    const handleClearInput = () => {
        setSearchValue('');
        const idx = searchTag.findIndex((item) => item.tag === tag);
        params.tag = searchTag[idx].tag;
        params.q = '';
        params.topic = topic;
        setParams(params);
    };

    // handle remove topic
    const handleRemoveTopic = () => {
        const idx = searchTag.findIndex((item) => item.tag === tag);
        params.tag = searchTag[idx].tag;
        params.q = searchValue;
        params.topic = '';
        setParams(params);
        setTopic('');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Tìm kiếm câu trả lời hữu ích</h2>
                    <div className={cx('search')}>
                        <Search
                            value={searchValue}
                            setValue={setSearchValue}
                            onChangeInput={handleChangeSearchValue}
                            onClearInput={handleClearInput}
                        />
                    </div>
                </div>
                {topic && (
                    <div className={cx('topic-search')}>
                        <p className={cx('topic-text')}>
                            Topic : <span className={cx('topic-item')}>{topic}</span>
                        </p>
                        <MdClose className={cx('close-icon')} onClick={handleRemoveTopic} />
                    </div>
                )}

                <div className={cx('line')}>
                    <div className={cx('topic-list')}>
                        {searchTag.map((nav, index) => {
                            return (
                                <TopicItem
                                    key={index}
                                    topic={nav.name}
                                    onClickTopic={() => handleClickTag(nav)}
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
