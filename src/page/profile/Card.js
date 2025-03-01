import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
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
import { PiClockFill } from 'react-icons/pi';
import Tippy from '@tippyjs/react/headless';
import setError from '~/helper/setError';
import calculateTime from '~/helper/calculateTime';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { skeletonColors } from '~/config/uiConfig';
import { tokenUtils } from '~/utils';

const cx = classNames.bind(styles);

function Card({ title, id, slug, tableType, handleDelete = defaultFn, editable, isPublish, publishAt }) {
    const userId = useSelector((state) => state.auth.userId);
    const [visible, setVisible] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [menu, setMenu] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // For Confirm Box
    const handleCancle = useCallback(() => {
        setIsShowConfirm(false);
    });

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
                }
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
    };

    useEffect(() => {
        const handlePublishArticle = async () => {
            try {
                const result = await articleService.publish(id);
                navigate(`/article/${result.slug}`);
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
        if (!isPublish) {
            menuList = [
                {
                    title: 'Đăng bài',
                    fn: handlePublishArticle,
                },
                ...menuList,
            ];
        }

        setMenu(menuList);
    }, []);

    const show = () => {
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };

    return (
        <div className={cx('card', `tag-${tableType}`)}>
            <div className={cx('card-header')}>
                <p
                    className={cx('card-title')}
                    onClick={() => {
                        if (isPublish) navigate(`/article/${slug}`);
                        else {
                            dispatch(
                                addToast(
                                    createToast({
                                        type: 'info',
                                        content: 'Bài viết chưa được đăng !',
                                    }),
                                ),
                            );
                        }
                    }}
                >
                    {title}
                </p>
                {editable && (
                    <HeadlessTippy
                        visible={visible}
                        interactive
                        offset={tableType === 'bookmark' ? [-50, -60] : isPublish ? [-50, -100] : [-50, -140]}
                        onClickOutside={hide}
                        menu={<MenuTippyItem width={120} list={menu} hide={hide} />}
                    >
                        <span className={cx('card-menu')} onClick={show}>
                            <BiDotsHorizontalRounded className={cx('menu-icon')} onClick={show} />
                        </span>
                    </HeadlessTippy>
                )}
            </div>

            <div className={cx('card-mode', !isPublish && 'pedding')}>
                <p className={cx('mode-text')}>{isPublish ? 'publish' : 'pending'} </p>
                {!isPublish && (
                    <Tippy
                        render={(attrs) => (
                            <div className={cx('box')} tabIndex="-1" {...attrs}>
                                <p className={cx('clock-tooltip')}>Bài viết sẽ đăng sau {calculateTime(publishAt)}</p>
                            </div>
                        )}
                    >
                        <span className={cx('clock')}>
                            <PiClockFill className={cx('clock-icon')} />
                        </span>
                    </Tippy>
                )}
            </div>

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

Card.Skeleton = function () {
    const theme = tokenUtils.getTheme();
    return (
        <div className={cx('card')}>
            <SkeletonTheme
                baseColor={theme === 'dark' ? skeletonColors[0].base : skeletonColors[1].base}
                highlightColor={theme === 'dark' ? skeletonColors[0].hl : skeletonColors[1].hl}
            >
                <div className={cx('header')}>
                    <Skeleton height={30} width="90%" />
                </div>

                <Skeleton width={50} height={10} />
            </SkeletonTheme>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    tableType: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    isPublish: PropTypes.bool,
    publishAt: PropTypes.string,
};

export default Card;
