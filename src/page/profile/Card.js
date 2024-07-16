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
import defaultFn from '~/utils/defaultFn';

const cx = classNames.bind(styles);

function Card({ title, id, tableType, postType, handleDelete = defaultFn, editable }) {
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
        if (tableType === 'bookmark') {
            removeFromBookmarkedList();
        } else {
            deletePost();
        }
    };

    // For Tipppy

    const handleEdit = () => {
        let path = '';
        if (tableType === 'article') path = `/write/${id}`;
        else if (tableType === 'question') path = `/ask/${id}`;
        navigate(path);
    };

    const removeFromBookmarkedList = () => {
        const data = {
            bookmarkTableId: id,
            bookmarkTableType: postType.toUpperCase(),
            bookmarkedUser: userId,
        };
        const fetchAPI = async () => {
            const result = await bookmarkService.toggleBookmark(data);
            if (result?.status === 'OK') {
                handleDelete(id);
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
            if (tableType === 'article') {
                result = await articleService.deleteArt(id);
            } else if (tableType === 'question') {
                result = await questionService.deleteQuestion(id);
            }
            if (result?.data === true) {
                setIsShowConfirm(false);
                handleDelete(id);
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

    if (tableType === 'bookmark')
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
        <div className={cx('card', `tag-${postType}`)}>
            <div className={cx('card-header')}>
                <p className={cx('card-title')} onClick={() => navigate(`/${postType}/${id}`)}>
                    {title}
                </p>
                {editable && (
                    <HeadlessTippy
                        visible={visible}
                        interactive
                        offset={tableType === 'bookmark' ? [-50, -60] : [-50, -100]}
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
