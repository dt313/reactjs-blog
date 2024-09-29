import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import HeadlessTippy from '~/components/headless/HeadlessTippy';
import { articleService, bookmarkService } from '~/services';
import defaultFn from '~/utils/defaultFn';
import MenuTippyItem from '~/components/menuTippyItem';
import ModelBox from '~/components/modelBox';
import Overlay from '~/components/overlay';
const cx = classNames.bind(styles);

function Card({ title, id, slug, tableType, handleDelete = defaultFn, editable }) {
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

    const removeFromBookmarkedList = () => {
        const data = {
            bookmarkTableId: id,
            bookmarkTableType: 'ARTICLE',
            bookmarkedUser: userId,
        };
        const fetchAPI = async () => {
            try {
                await bookmarkService.toggleBookmark(data);
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
            } catch (error) {
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
    };

    const deletePost = () => {
        const fetchAPI = async () => {
            try {
                let result = null;
                if (tableType === 'article') {
                    result = await articleService.deleteArt(id);
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
            } catch (error) {
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
            fn: () => navigate(`/write/${slug}`),
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
        <div className={cx('card', `tag-${tableType}`)}>
            <div className={cx('card-header')}>
                <p className={cx('card-title')} onClick={() => navigate(`/article/${slug}`)}>
                    {title}
                </p>
                {editable && (
                    <HeadlessTippy
                        visible={visible}
                        interactive
                        offset={tableType === 'bookmark' ? [-50, -60] : [-50, -100]}
                        onClickOutside={hide}
                        menu={<MenuTippyItem width={120} list={menuList} hide={hide} />}
                    >
                        <span className={cx('card-menu')} onClick={show}>
                            <BiDotsHorizontalRounded className={cx('menu-icon')} onClick={show} />
                        </span>
                    </HeadlessTippy>
                )}
            </div>

            <span className={cx('card-mode')}>public</span>

            <Overlay state={isShowConfirm}>
                <ModelBox
                    state={isShowConfirm}
                    title="Xác nhận"
                    isConfirm
                    onClose={handleCancle}
                    onConfirm={handleConfirmOk}
                >
                    <p className={cx('confirm-description')}>
                        Bạn có chắc chắn muốn {tableType === 'article' ? 'xóa ' : 'bỏ lưu '} bài viết{' '}
                        <strong onClick={() => navigate(`/article/${slug}`)}>{title}</strong>
                    </p>
                </ModelBox>
            </Overlay>
        </div>
    );
}

export default Card;
