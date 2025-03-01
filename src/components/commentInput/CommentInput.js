import PropTypes from 'prop-types';
import MarkDown from '~/components/markdown';
import styles from './CommentInput.module.scss';
import classNames from 'classnames/bind';
import Editor from '~/components/editor';
import { memo, useCallback, useState } from 'react';
import Button from '~/components/button';
import Avatar from '~/components/avatar';
import requireAuthFn from '~/helper/requireAuthFn';
import { useDispatch, useSelector } from 'react-redux';
import { addToast, createToast } from '~/redux/actions/toastAction';
import tokenUtils from '~/utils/token';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function CommentInput({
    reply = false,
    defaultValue = '',
    onComment = defaultFn,
    placeholder = '',
    isShow = false,
    onCloseInput,
    onOpenInput,
}) {
    const [value, setValue] = useState(defaultValue);
    const [disabled, setDisabled] = useState(true);
    const { isAuthentication } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function handleEditorChange({ text }) {
        setValue(text);
        if (text.trim() !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const handleSubmit = useCallback(() => {
        setValue('');
        onComment(value);
        onCloseInput();
    }, [value]);

    const handleCancle = useCallback(() => {
        let result = false;
        if (!disabled > 0) {
            result = window.confirm(value);
            if (result === true) {
                setValue('');
                setDisabled(true);
                onCloseInput();
            } else return;
        } else {
            setValue('');
            setDisabled(true);
            onCloseInput();
        }
    }, [disabled]);

    const renderHTML = (text) => {
        return <MarkDown text={text} />;
    };

    return (
        <div className={cx('wrapper', [reply])}>
            {!reply && isShow === false && (
                <div
                    className={cx('label')}
                    onClick={() =>
                        requireAuthFn(isAuthentication, onOpenInput, () => {
                            dispatch(
                                addToast(
                                    createToast({
                                        type: 'warning',
                                        content: 'Bạn cần đăng nhập để bình luận bài viết này',
                                    }),
                                ),
                            );
                        })
                    }
                >
                    {placeholder}
                </div>
            )}
            {isShow && (
                <div className={cx('comment')}>
                    <div className={cx('input-box')}>
                        <Avatar src={tokenUtils.getAvatar()} />
                        <div className={cx('text-input')}>
                            <Editor
                                content={value}
                                defaultValue={defaultValue}
                                handleEditorChange={handleEditorChange}
                                renderHTML={renderHTML}
                                placeholder={placeholder}
                                className={cx('input')}
                                autoFocus={true}
                            />
                        </div>
                    </div>
                    <div className={cx('btn-box')}>
                        <Button text onClick={handleCancle} className={cx('btn', 'cancel-btn')}>
                            Hủy
                        </Button>
                        <Button disabled={disabled} primary onClick={handleSubmit} className={cx('btn', 'submit-btn')}>
                            {reply ? 'Tra loi' : 'Bình luận'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

CommentInput.propTypes = {
    reply: PropTypes.bool,
    defaultValue: PropTypes.string,
    onComment: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    isShow: PropTypes.bool.isRequired,
    onCloseInput: PropTypes.func.isRequired,
    onOpenInput: PropTypes.func.isRequired,
};

export default memo(CommentInput);
