import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Avatar from '~/components/avatar';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import TopicItem from '../search/TopicItem';
import { profileTag } from '~/config/uiConfig';
import useTitle from '~/hook/useTitle';
import Confirm from '~/components/confirm';
import Card from './Card';
import { useDispatch } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';

const cx = classNames.bind(styles);

function Profile() {
    let { username } = useParams();
    useTitle(`Profile | ${username.slice(1).toUpperCase()}`);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isShowConfirm, setIsShowConfirm] = useState(false);

    // For Confirm Box
    const handleCancle = () => {
        setIsShowConfirm(false);
    };

    const handleOK = () => {
        console.log('Confirm OK');
        setIsShowConfirm(false);
        dispatch(
            addToast(
                createToast({
                    type: 'success',
                    content: 'Bạn đã xóa thành công bài viết' + uuidv4().toString(),
                }),
            ),
        );
    };

    // For Tipppy
    const handleEdit = () => {
        navigate(`/write/`);
    };

    useEffect(() => {
        setSearchParams({ tag: profileTag[0].tag });
    }, []);
    const menuList = [
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <Avatar className={cx('avatar')} />
                    <h3 className={cx('name')}>DANH TUAN</h3>
                    <span className={cx('special-name')}>danhtuan3103</span>
                </div>
                <div className={cx('body')}>
                    <div className={cx('nav')}>
                        <div className={cx('topic-list')}>
                            {profileTag.map((nav, index) => {
                                return (
                                    <TopicItem
                                        className={cx('nav-link')}
                                        key={index}
                                        active={searchParams.get('tag') === nav.tag}
                                        topic={nav.name}
                                        onClickTopic={() => {
                                            const idx = profileTag.findIndex((item) => item.tag === nav.tag);
                                            setSearchParams({ tag: profileTag[idx].tag });
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {[1, 2, 3, 4, 5, 6, 6, 7, 8].map((content, index) => {
                            return <Card key={index} content={content} tippyMenu={menuList} />;
                        })}
                    </div>
                </div>
            </div>
            {isShowConfirm && (
                <Confirm
                    title="Bạn có chắc chắn muốn xóa bài viết nay không ?"
                    handleOK={handleOK}
                    handleCancle={handleCancle}
                />
            )}
        </div>
    );
}

export default Profile;
