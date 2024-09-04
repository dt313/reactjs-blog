import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import copyTextToClipboard from '~/helper/copyClipboard';
import DropMenu from '../dropMenu/DropMenu';
import { open } from '~/redux/actions/shareBoxAction';
import requireAuthFn from '~/helper/requireAuthFn';

const cx = classNames.bind(styles);
function ArticleHeader({
    className,
    author,
    postSlug,
    onBookmark,
    large = false,
    time = '',
    hasShare = false,
    is_bookmarked = false,
}) {
    const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const { userId, isAuthentication } = useSelector((state) => state.auth);

    const path = window.origin + `/article/${postSlug}`;
    // menu tippy
    const menuList = [
        {
            title: 'Chia sẻ',
            fn: () => {
                dispatch(open());
            },
        },
        {
            title: 'Sao chép liên kết',
            fn: () => {
                copyTextToClipboard(path);

                dispatch(addToast(createToast({ type: 'success', content: 'Đã link bài viết copy thành công' })));
            },
        },
        {
            title: 'Báo cáo bài viết',
            fn: () => {
                dispatch(
                    addToast(
                        createToast({
                            type: 'success',
                            content: 'Đã báo cáo bài viết thành công ! Cảm ơn bạn vì đã hỗ trợ',
                        }),
                    ),
                );
            },
        },
    ];

    useEffect(() => {
        setIsBookmarked(is_bookmarked);
    }, [is_bookmarked]);
    // className
    const classes = cx('header', {
        [className]: className,
        large,
    });

    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };

    const handleBookmark = (is_bookmarked) => {
        dispatch(
            addToast(
                createToast({
                    type: 'success',
                    content: is_bookmarked ? 'Đã lưu bài viết thành công' : 'Đã bỏ lưu bài viết thành công',
                }),
            ),
        );
        setIsBookmarked(is_bookmarked);
    };

    // handle click user
    const handleClickUser = () => {
        navigate(`/profile/@${author?.username}`);
    };

    return (
        <div className={classes}>
            <div className={cx('user')} onClick={handleClickUser}>
                <Avatar className={cx('avatar')} alt="name" src={author?.avatar} />
                <div className={cx('blog-info')}>
                    <span className={cx('author')}>{author?.username}</span>
                    {time && <span className={cx('date')}>{time}</span>}
                </div>
            </div>

            <div className={cx('icon-box')}>
                <span className={cx('icon-wrap', !hasShare && 'large-icon')}>
                    {isBookmarked ? (
                        <BsBookmarkFill
                            className={cx('icon', 'active')}
                            onClick={() =>
                                requireAuthFn(
                                    isAuthentication,
                                    () => onBookmark(handleBookmark),
                                    () => {
                                        dispatch(
                                            addToast(
                                                createToast({
                                                    type: 'success',
                                                    content: 'Bạn cần đăng nhập để lưu bài viết',
                                                }),
                                            ),
                                        );
                                    },
                                )
                            }
                        />
                    ) : (
                        <BsBookmark
                            className={cx('icon')}
                            onClick={() =>
                                requireAuthFn(
                                    isAuthentication,
                                    () => onBookmark(handleBookmark),
                                    () => {
                                        dispatch(
                                            addToast(
                                                createToast({
                                                    type: 'success',
                                                    content: 'Bạn cần đăng nhập để lưu bài viết',
                                                }),
                                            ),
                                        );
                                    },
                                )
                            }
                        />
                    )}
                </span>
                {hasShare && (
                    <DropMenu offset={[-90, -150]} menu={menuList}>
                        <BiDotsHorizontalRounded className={cx('icon')} />
                    </DropMenu>
                )}
            </div>
        </div>
    );
}

export default ArticleHeader;
