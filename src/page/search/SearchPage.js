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
import useTitle from '~/hook/useTitle';
import { SpinnerLoader } from '~/components/loading/Loading';
import { articleService, questionService } from '~/services';
import { ARTICLE_PAGE_SIZE } from '~/config/uiConfig';
import useDebounce from '~/hook/useDebounce';
const cx = classNames.bind(styles);

function SearchPage() {
    useTitle('Search');
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [tag, setTag] = useState(searchParams.get('tag') || searchTag[0].tag);
    const [topic, setTopic] = useState(searchParams.get('topic') || '');
    const [articles, setArticles] = useState([]);
    const [length, setLength] = useState(0);
    const debounceValue = useDebounce(searchValue, 1300);

    useEffect(() => {
        const fetchAPI = async () => {
            const data = { searchValue, topic, pageNumber: page, pageSize: ARTICLE_PAGE_SIZE };
            setLoading(true);
            let result;
            if (tag === 'article') {
                result = await articleService.searchFor(data);
            } else if (tag === 'question') {
                result = await questionService.searchFor(data);
            }
            setArticles(result);
            setLoading(false);
        };

        fetchAPI();
    }, [page, debounceValue, tag, topic]);

    useEffect(() => {
        const fetchAPI = async () => {
            const data = { searchValue, topic };
            let length = 0;
            if (tag === 'article') {
                length = await articleService.getLength(data);
            } else if (tag === 'question') {
                length = await questionService.getLength(data);
            }
            setLength(length);
        };
        fetchAPI();
    }, [debounceValue, tag, topic]);
    const setParams = (tag, topic, q, page) => {
        let newParams = {};
        if (!!tag && !!topic && !!q && !!page) {
        }
        if (!!tag) {
            newParams.tag = tag;
        }
        if (!!topic) {
            newParams.topic = topic;
        }
        if (!!q) {
            newParams.q = q;
        }
        if (!!page) {
            newParams.page = page;
        }
        setSearchParams(newParams);
    };

    useEffect(() => {
        setParams(searchParams.get('tag') || searchTag[0].tag, topic, searchValue, page);
    }, [searchParams]);

    const handleClickTag = useCallback(
        (nav) => {
            const idx = findIndexTag(nav.tag);
            setTag(searchTag[idx].tag);
            setPage(1);
            setParams(searchTag[idx].tag, topic, searchValue, 1);
        },
        [tag, searchParams],
    );

    // find index of tag
    const findIndexTag = (tag) => {
        return searchTag.findIndex((item) => item.tag === tag);
    };

    // change input
    const handleChangeSearchValue = (e) => {
        const idx = findIndexTag(tag);
        setPage(1);
        setParams(searchTag[idx].tag, topic, e.target.value, 1);
        setSearchValue(e.target.value);

        if (!!topic) {
            handleRemoveTopic();
        }
    };

    // clear input
    const handleClearInput = () => {
        setSearchValue('');
        const idx = findIndexTag(tag);
        setParams(searchTag[idx].tag, topic, '', page);
    };

    // handle remove topic
    const handleRemoveTopic = () => {
        const idx = findIndexTag(tag);
        setParams(searchTag[idx].tag, '', searchValue, page);
        setTopic('');
    };

    const handleChangePage = (page) => {
        const idx = findIndexTag(tag);
        setPage(page);
        setParams(searchTag[idx].tag, topic, searchValue, page);
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
                        articles?.length > 0 ? (
                            articles.map((art, index) => {
                                return <Article key={art.id} className={cx('card')} content={art} type={tag}></Article>;
                            })
                        ) : (
                            <p className={cx('empty-noti')}>There are no posts</p>
                        )
                    ) : (
                        <div className={cx('loader-wrapper')}>
                            <SpinnerLoader />
                        </div>
                    )}
                </div>

                <div className={cx('pagination')}>
                    <Pagination value={page} setValue={setPage} handleChangePage={handleChangePage} length={length} />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
