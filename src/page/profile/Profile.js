import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
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
import { addToast, createToast } from '~/redux/actions/toastAction';
import setError from '~/helper/setError';
import tokenUtils from '~/utils/token';
import { FaGithub, FaUserClock, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import calculateTime from '~/helper/calculateTime';

const cx = classNames.bind(styles);

const toCardForm = (post) => {
    return {
        ...post.content,
        bookmarkId: post.id,
        created_at: post.created_at,
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

    const navigate = useNavigate();

    const fetchPosts = async (id) => {
        try {
            let newPost = [];
            if (tag === 'article') {
                newPost = await articleService.getArticleByAuthor(id);
            } else if (tag === 'bookmark') {
                newPost = await bookmarkService.getAllBookmarkedArticleByUserId(id);
                newPost.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                newPost = newPost?.map((post) => {
                    return toCardForm(post);
                });
            }
            // Sort posts by createdAt
            newPost.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            return newPost;
        } catch (error) {
            let err = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: err,
                    }),
                ),
            );
        } finally {
            setLoading(false);
        }
    };

    // Fetch Infomation
    useEffect(() => {
        if (username === '@me' || username === `@${tokenUtils.getUser().username}`) {
            const fetchAPI = async () => {
                try {
                    setInfomation(tokenUtils.getUser());
                    setTags(setProfileTag(true));
                    setPosts(await fetchPosts(userId));
                } catch (error) {
                    let err = setError(error);
                    dispatch(
                        addToast(
                            createToast({
                                type: 'error',
                                content: err,
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
                    let err = setError(error);
                    dispatch(
                        addToast(
                            createToast({
                                type: 'error',
                                content: err,
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

    const renderInfo = () => {
        return (
            <div className={cx('extra-info')}>
                {infomation?.created_at && (
                    <Button
                        text
                        leftIcon={<FaUserClock className={cx('extra-info-icon')} />}
                        className={cx('extra-info-item', 'date')}
                    >
                        {calculateTime(infomation?.created_at)}
                    </Button>
                )}
                {infomation?.bio && <p className={cx('bio')}>{infomation?.bio}</p>}
                {infomation?.web_link && (
                    <Button
                        text
                        leftIcon={<TbWorldWww className={cx('extra-info-icon')} />}
                        className={cx('extra-info-item')}
                        href={infomation?.web_link}
                        target="_blank"
                    >
                        {infomation?.web_link}
                    </Button>
                )}
                {infomation?.fb_link && (
                    <Button
                        text
                        leftIcon={<FaFacebook className={cx('extra-info-icon')} />}
                        className={cx('extra-info-item')}
                        href={infomation?.fb_link}
                        target="_blank"
                    >
                        {infomation?.fb_link}
                    </Button>
                )}
                {infomation?.lk_link && (
                    <Button
                        text
                        leftIcon={<FaLinkedin className={cx('extra-info-icon')} />}
                        className={cx('extra-info-item')}
                        href={infomation?.lk_link}
                        target="_blank"
                    >
                        {infomation?.lk_link}
                    </Button>
                )}
                {infomation?.gh_link && (
                    <Button
                        text
                        leftIcon={<FaGithub className={cx('extra-info-icon')} />}
                        className={cx('extra-info-item')}
                        href={infomation?.gh_link}
                        target="_blank"
                    >
                        {infomation?.gh_link}
                    </Button>
                )}
                {infomation?.ig_link && (
                    <Button
                        text
                        leftIcon={<FaInstagram className={cx('extra-info-icon')} />}
                        className={cx('extra-info-item')}
                        href={infomation?.ig_link}
                        target="_blank"
                    >
                        {infomation?.ig_link}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <Avatar className={cx('avatar')} src={infomation?.avatar} />
                    {infomation?.name && <h3 className={cx('name')}>{infomation?.name || 'NO NAME'}</h3>}
                    {<span className={cx('special-name')}>@{infomation?.username || 'NO USERNAME'}</span>}
                    {renderInfo()}

                    {userId === infomation?.id && (
                        <Button primary className={cx('setting-button')} onClick={() => navigate('/setting')}>
                            Cài đặt
                        </Button>
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
                                        icon={nav.icon}
                                        onClickTopic={() => {
                                            if (tag === nav.tag) {
                                                return;
                                            }
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
                        {posts?.length > 0 ? (
                            posts.map((post, index) => {
                                return !loading ? (
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
                                ) : (
                                    <Card.Skeleton key={index}></Card.Skeleton>
                                );
                            })
                        ) : (
                            <p className={cx('empty-noti')}>Không có bài viết nào</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
