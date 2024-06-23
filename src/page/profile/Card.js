import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import HeadlessTippy from '~/components/headless/HeadlessTippy';
import MenuTippy from '~/components/menuTippy';
import Confirm from '~/components/confirm/Confirm';
import { articleService, bookmarkService, questionService } from '~/services';

const cx = classNames.bind(styles);

function Card({ content, type, handleDelete, editable }) {
    const userId = useSelector((state) => state.auth.userId);
    const [visible, setVisible] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // For Confirm Box
    const handleCancle = () => {
        setIsShowConfirm(false);
    };

    const handleConfirmOk = () => {
        // delete article
        if (type === 'bookmark') {
            removeFromBookmarkedList();
        } else {
            deletePost();
        }
    };

    // For Tipppy

    const handleEdit = () => {
        let path = '';
        if (type === 'article') path = `/write/${content.id}`;
        else if (type === 'question') path = `/ask/${content.id}`;
        navigate(path);
    };

    const removeFromBookmarkedList = () => {
        const data = {
            bookmarkTableId: content?.id,
            bookmarkTableType: 'ARTICLE',
            bookmarkedUser: userId,
        };
        const fetchAPI = async () => {
            const result = await bookmarkService.toggleBookmark(data);
            if (result?.status === 'OK') {
                handleDelete(content.id);
                setIsShowConfirm(false);
                dispatch(
                    addToast(
                        createToast({
                            type: 'success',
                            content: 'Bạn đã bỏ lưu thành công',
                        }),
                    ),
                );
            } else {
                console.log(result);
            }
        };
        fetchAPI();
    };

    const deletePost = () => {
        const fetchAPI = async () => {
            let result = null;
            if (type === 'article') {
                result = await articleService.deleteArt(content.id);
            } else if (type === 'question') {
                result = await questionService.deleteQuestion(content.id);
            }
            if (result?.data === true) {
                setIsShowConfirm(false);
                handleDelete(content.id);
                dispatch(
                    addToast(
                        createToast({
                            type: 'success',
                            content: 'Bạn đã xóa thành công bài viết',
                        }),
                    ),
                );
            } else {
                console.log(result);
            }
        };

        fetchAPI();
    };
    let menuList = [
        {
            title: 'Xoá',
            fn: () => {
                setIsShowConfirm(true);
            },
        },
        {
            title: 'Sửa',
            fn: handleEdit,
        },
    ];

    if (type === 'bookmark')
        menuList = [
            {
                title: 'Bỏ lưu',
                fn: () => {
                    setIsShowConfirm(true);
                },
            },
        ];

    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };

    return (
        <div className={cx('card', `tag-${type}`)}>
            <div className={cx('card-header')}>
                <p className={cx('card-title')} onClick={() => navigate(`/${type}/${content?.id}`)}>
                    {type === 'article' ? content?.metaTitle || content.title : content.content}
                </p>
                {editable && (
                    <HeadlessTippy
                        visible={visible}
                        interactive
                        offset={type === 'bookmark' ? [-50, -60] : [-50, -100]}
                        onClickOutside={hide}
                        menu={<MenuTippy width={120} list={menuList} hide={hide} />}
                    >
                        <span className={cx('card-menu')} onClick={show}>
                            <BiDotsHorizontalRounded className={cx('menu-icon')} onClick={show} />
                        </span>
                    </HeadlessTippy>
                )}
            </div>

            <span className={cx('card-mode')}>public</span>
            {isShowConfirm && (
                <Confirm
                    title="Bạn có chắc chắn muốn xóa bài viết nay không ?"
                    handleOK={handleConfirmOk}
                    handleCancle={handleCancle}
                />
            )}
        </div>
    );
}

export default Card;
