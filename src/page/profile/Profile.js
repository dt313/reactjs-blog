import { useSearchParams, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from '~/components/avatar';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import TopicItem from '../search/TopicItem';
import { profileTag } from '~/config/uiConfig';
import useTitle from '~/hook/useTitle';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { articleService, bookmarkService, userService } from '~/services';
import setProfileTag from '~/helper/setProfileTag';
import { SpinnerLoader } from '~/components/loading/Loading';
import { addToast, createToast } from '~/redux/actions/toastAction';

const cx = classNames.bind(styles);

const toCardForm = (post) => {
    return {
        ...post.content,
        bookmarkId: post.id,
        createdAt: post.created_at,
    };
};

function Profile() {
    let { username } = useParams();
    useTitle(`Profile | ${username.slice(1).toUpperCase()}`);

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const [searchParams, setSearchParams] = useSearchParams();
    const [infomation, setInfomation] = useState({});
    const [tag, setTag] = useState(searchParams.get('tag') || 'article');
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState(profileTag);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async (id) => {
        try {
            let newPost = [];
            if (tag === 'article') {
                newPost = await articleService.getArticleByAuthor(id);
            } else if (tag === 'bookmark') {
                newPost = await bookmarkService.getAllBookmarkedArticleByUserId(id);
                newPost = newPost?.map((post) => {
                    return toCardForm(post);
                });
            }
            return newPost;
        } catch (error) {
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: error,
                    }),
                ),
            );
        } finally {
            setLoading(false);
        }
    };

    // Fetch Infomation
    useEffect(() => {
        if (username === '@me') {
            const fetchAPI = async () => {
                try {
                    const result = await userService.getMyInfomation();
                    setInfomation(result?.data);
                    setTags(setProfileTag(true));
                    setPosts(await fetchPosts(userId));
                } catch (error) {
                    dispatch(
                        addToast(
                            createToast({
                                type: 'error',
                                content: error,
                            }),
                        ),
                    );
                }
            };
            fetchAPI();
        } else {
            const fetchAPI = async () => {
                try {
                    username = username.slice(1);
                    const result = await userService.getInfomationByUsername(username);

                    setInfomation(result?.data);
                    setTags(setProfileTag(result?.data.id === userId));
                    setPosts(await fetchPosts(result?.data?.id));
                } catch (error) {
                    dispatch(
                        addToast(
                            createToast({
                                type: 'error',
                                content: error,
                            }),
                        ),
                    );
                }
            };
            fetchAPI();
        }
    }, [tag, username]);

    useEffect(() => {
        setSearchParams({ tag: profileTag[0].tag });
    }, []);

    const handleDeletePost = (id) => {
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <Avatar className={cx('avatar')} src={infomation?.avatar} />
                    {/* <h3 className={cx('name')}>{infomation?.name || 'NO NAME'}</h3> */}
                    <span className={cx('special-name')}>{infomation?.username || 'NO USERNAME'}</span>
                    {/* <Button secondary onClick={handleCickSetting}>
                        {' '}
                        Setting
                    </Button> */}
                </div>
                <div className={cx('body')}>
                    <div className={cx('nav')}>
                        <div className={cx('topic-list')}>
                            {tags.map((nav, index) => {
                                return (
                                    <TopicItem
                                        className={cx('nav-link')}
                                        key={index}
                                        active={tag === nav.tag}
                                        topic={nav.name}
                                        onClickTopic={() => {
                                            const idx = profileTag.findIndex((item) => item.tag === nav.tag);
                                            setLoading(true);
                                            setSearchParams({ tag: profileTag[idx].tag });
                                            setTag(profileTag[idx].tag);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {!loading ? (
                            posts?.length > 0 ? (
                                posts.map((post, index) => {
                                    return (
                                        <Card
                                            key={post.bookmarkId || post.id}
                                            title={post.metaTitle || post.title || post.content}
                                            id={post.id}
                                            slug={post.slug}
                                            tableType={tag}
                                            postType={post.tableType?.toLowerCase()}
                                            handleDelete={handleDeletePost}
                                            editable={infomation?.id === userId}
                                        />
                                    );
                                })
                            ) : (
                                <p className={cx('empty-noti')}>Không có bài viết nào</p>
                            )
                        ) : (
                            <div className={cx('loader-wrapper')}>
                                <SpinnerLoader small />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
