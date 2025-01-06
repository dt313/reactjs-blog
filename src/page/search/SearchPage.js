import { useState, useEffect } from 'react';
import styles from './SearchPage.module.scss';
import classNames from 'classnames/bind';
import Search from '~/components/search';
import TopicItem from './TopicItem';
import Article from '~/components/article';
import Pagination from '~/components/pagination';
import { searchTag } from '~/config/uiConfig';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { useSearchParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import useTitle from '~/hook/useTitle';
import { SpinnerLoader } from '~/components/loading/Loading';
import { articleService } from '~/services';
import { ARTICLE_PAGE_SIZE } from '~/config/uiConfig';
import useDebounce from '~/hook/useDebounce';
import { useDispatch } from 'react-redux';
import setError from '~/helper/setError';
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
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                setLoading(true);
                const data = { searchValue, topic, pageNumber: page, pageSize: ARTICLE_PAGE_SIZE };
                let result;
                if (tag === 'article') {
                    result = await articleService.searchFor(data);
                } else {
                    result = await articleService.searchFeature(data);
                }
                setArticles(result);
            } catch (error) {
                error = setError(error);
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: error.message,
                        }),
                    ),
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAPI();
    }, [page, debounceValue, tag, topic]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const data = { searchValue, topic };
                let length = 0;
                if (tag === 'article') {
                    length = await articleService.getLength(data);
                }
                setLength(length);
            } catch (error) {
                error = setError(error);
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: error.message,
                        }),
                    ),
                );
            }
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
            newParams.tag = 'article';
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

    const handleClickTag = (nav) => {
        const idx = findIndexTag(nav.tag);
        setTag(searchTag[idx].tag);
        if (searchTag[idx].tag === 'best') {
            setTopic('');
            setSearchValue('');
        }
        setPage(1);
        setParams(searchTag[idx].tag, '', '', 1);
    };

    // find index of tag
    const findIndexTag = (tag) => {
        return searchTag.findIndex((item) => item.tag === tag);
    };

    // change input
    const handleChangeSearchValue = (e) => {
        setPage(1);
        setTag('article');
        setParams('article', topic, e.target.value, 1);
        setSearchValue(e.target.value);

        if (!!topic) {
            handleRemoveTopic();
        }
    };

    // clear input
    const handleClearInput = () => {
        setSearchValue('');
        setParams('article', topic, '', page);
    };

    // handle remove topic
    const handleRemoveTopic = () => {
        setParams('article', '', searchValue, page);
        setTopic('');
    };

    const handleChangePage = (page) => {
        setPage(page);
        setParams('article', topic, searchValue, page);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Tìm kiếm câu bài viết hữu ích</h2>
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
                            Topic : <span className={cx('topic-item')}>#{topic}</span>
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
                                return (
                                    <Article
                                        primary={tag === 'best'}
                                        key={art.id}
                                        className={cx('card')}
                                        content={art}
                                    ></Article>
                                );
                            })
                        ) : (
                            <p className={cx('empty-noti')}>Không có bài viết nào</p>
                        )
                    ) : (
                        <div className={cx('loader-wrapper')}>
                            <SpinnerLoader />
                        </div>
                    )}
                </div>

                <div className={cx('pagination')}>
                    {tag !== 'best' && (
                        <Pagination
                            value={page}
                            setValue={setPage}
                            handleChangePage={handleChangePage}
                            length={length}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
