import { useSearchParams, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from '~/components/avatar';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import TopicItem from '../search/TopicItem';
import { profileTag } from '~/config/uiConfig';
import useTitle from '~/hook/useTitle';
import Button from '~/components/button/Button';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { articleService, bookmarkService, userService } from '~/services';
import setProfileTag from '~/helper/setProfileTag';
import { SpinnerLoader } from '~/components/loading/Loading';
import { addToast, createToast } from '~/redux/actions/toastAction';
import setError from '~/helper/setError';
import tokenUtils from '~/utils/token';
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
    const [isEditor, setIsEditor] = useState(false);

    const [name, setName] = useState('');
    const [usrname, setUsrname] = useState('');

    useEffect(() => {
        if (infomation) {
            setName(infomation.name);
            setUsrname(infomation.username);
        }
    }, [infomation]);

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
            error = setError(error);
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
                    error = setError(error);
                    if (typeof error === 'object') error = error.message;

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
                    error = setError(error);
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

    const updateInfomation = async () => {
        try {
            const result = await userService.updateInfomation(infomation.id, {
                username: usrname,
                name: name,
            });

            const { token, user } = result.data;
            tokenUtils.setUser(user);
            tokenUtils.setAccessToken(token);
            setInfomation(user);
            setIsEditor(false);
        } catch (error) {}
    };

    console.log(userId, infomation.id);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <Avatar className={cx('avatar')} src={infomation?.avatar} />
                    {!isEditor && <h3 className={cx('name')}>{infomation?.name || 'NO NAME'}</h3>}
                    {!isEditor && <span className={cx('special-name')}>{infomation?.username || 'NO USERNAME'}</span>}
                    {!isEditor && userId === infomation?.id && (
                        <Button className={cx('edit-button')} onClick={() => setIsEditor(true)}>
                            Edit profile
                        </Button>
                    )}

                    {isEditor && (
                        <div className={cx('profile-editor')}>
                            <div className={cx('form')}>
                                <label htmlFor="username" className={cx('editor-label')}>
                                    Username{' '}
                                </label>
                                <input
                                    className={cx('editor-input')}
                                    id="username"
                                    type="text"
                                    value={usrname}
                                    onChange={(e) => setUsrname(e.target.value)}
                                />
                            </div>
                            <div className={cx('form')}>
                                <label htmlFor="name" className={cx('editor-label')}>
                                    Name{' '}
                                </label>
                                <input
                                    className={cx('editor-input')}
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <Button className={cx('edit-button')} onClick={updateInfomation}>
                                Save
                            </Button>
                            <Button className={cx('edit-button')} onClick={() => setIsEditor(false)}>
                                Cancel
                            </Button>
                        </div>
                    )}
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
                                            isPublish={post.is_published}
                                            publishAt={post.publish_at}
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
