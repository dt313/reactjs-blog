import styles from './Article.module.scss';
import classNames from 'classnames/bind';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Avatar from '../avatar/Avatar';
import HeadlessTippy from '~/components/headless/HeadlessTippy';
import MenuTippy from '~/components/menuTippy';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { bookmarkService } from '~/services';
import { IoFileTrayStackedSharp } from 'react-icons/io5';
import copyTextToClipboard from '~/helper/copyClipboard';
import getTableType from '~/helper/getTableType';

const cx = classNames.bind(styles);
function ArticleHeader({ className, author, postId, type, onBookmark, large = false, time = '', hasShare = false }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const userId = useSelector((state) => state.auth.userId);

    const path = window.origin + `/${type}/${postId}`;
    // menu tippy
    const menuList = [
        {
            title: 'Chia sẻ lên Facebbok',
            fn: () => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${path}`, '_blank');
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

    useEffect(() => {
        const fetchAPI = async () => {
            const data = {
                tableType: getTableType(type),
                bookmarkTableId: postId,
                userId: userId,
            };
            const result = await bookmarkService.checkBookmark(data);
            if (result?.status === 'OK') {
                setIsBookmarked(result.data);
            } else console.log(result);
        };

        fetchAPI();
    }, []);
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
                        <BsBookmarkFill className={cx('icon', 'active')} onClick={() => onBookmark(handleBookmark)} />
                    ) : (
                        <BsBookmark className={cx('icon')} onClick={() => onBookmark(handleBookmark)} />
                    )}
                </span>
                {hasShare && (
                    <HeadlessTippy
                        interactive
                        visible={visible}
                        offset={[-90, -150]}
                        onClickOutside={hide}
                        menu={<MenuTippy width={200} list={menuList} hide={hide} />}
                    >
                        <span className={cx('icon-wrap')} onClick={show}>
                            <BiDotsHorizontalRounded className={cx('icon')} />
                        </span>
                    </HeadlessTippy>
                )}
            </div>
        </div>
    );
}

export default ArticleHeader;
