import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SettingTemplate.module.scss';
import SettingItem from '../settingItem';
import Overlay from '../overlay';
import SettingBox from '../settingBox';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mailService, userService } from '~/services';
import { tokenUtils } from '~/utils';
import { addToast, createToast } from '~/redux/actions/toastAction';
import setError from '~/helper/setError';

const cx = classNames.bind(styles);

function SettingTemplate({ list = [], headerText, desText }) {
    const [isOpenOverlay, setIsOpenOverlay] = useState(false);
    const [content, setContent] = useState({});
    const [editedName, setEditedName] = useState('');
    const [items, setItems] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setItems(list);
    }, [list]);

    const { userId } = useSelector((state) => state.auth);

    const handleClickSettingItem = useCallback(
        (title) => {
            setIsOpenOverlay(true);
            setContent(items.find((item) => item.title === title));
        },
        [items],
    );

    useEffect(() => {
        if (editedName) {
            const timer = setTimeout(() => {
                setEditedName('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [editedName]);

    const changeItemsProperty = (value) => {
        setItems((pre) => {
            return pre.map((item) => {
                if (item.name === content.name) {
                    return {
                        ...item,
                        content: value,
                        box: { ...item.box, content: value },
                    };
                }
                return item;
            });
        });
    };

    const handleSubmit = async (value, isImage = false) => {
        if (isImage) {
            changeItemsProperty(value);
            setEditedName(content.name);
            return;
        }

        if (content.name === 'password') {
            try {
                const result = await mailService.getResetPasswordLink({ to: value });
                dispatch(
                    addToast(
                        createToast({
                            type: 'success',
                            content:
                                'Chúng tôi đã gửi xác nhận đặt lại mật khẩu đến email của bạn . Vui lòng kiểm tra email !',
                        }),
                    ),
                );
                setIsOpenOverlay(false);
                setEditedName(content.name);
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
                return;
            }
        }

        try {
            const result = await userService.updateInfomation(userId, {
                [content.name]: value,
            });

            changeItemsProperty(value);

            const { token, user } = result.data;
            tokenUtils.setUser(user);
            tokenUtils.setAccessToken(token);

            setIsOpenOverlay(false);
            setEditedName(content.name);
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{headerText}</h3>
                <p className={cx('des')}>{desText}</p>
            </div>

            <div className={cx('content')}>
                {items.map((item, index) => (
                    <SettingItem
                        key={index}
                        className={cx('item', editedName === item.name && 'edited')}
                        content={item}
                        isImage={item?.isImage}
                        isColor={item?.isColor}
                        onClick={handleClickSettingItem}
                    />
                ))}
            </div>

            {isOpenOverlay && (
                <Overlay state={isOpenOverlay} onClick={() => setIsOpenOverlay(false)}>
                    <SettingBox
                        onClose={() => setIsOpenOverlay(false)}
                        content={content.box}
                        onSubmit={handleSubmit}
                        large={content.isImage || content.isLarge}
                    />
                </Overlay>
            )}
        </div>
    );
}

SettingTemplate.propTypes = {
    list: PropTypes.array,
    headerText: PropTypes.string,
    desText: PropTypes.string,
};

export default SettingTemplate;
