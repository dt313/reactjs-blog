import MarkDown from '~/components/MarkDown';
import styles from './CommentInput.module.scss';
import classNames from 'classnames/bind';
import Editor from '~/components/editor';
import { useState, useRef } from 'react';
import Button from '~/components/button';
import Avatar from '~/components/avatar';

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

    const ref = useRef();

    function handleEditorChange({ text }) {
        setValue(text);
        if (text.trim() !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const handleSubmit = () => {
        setValue('');
        onComment(value);
        onCloseInput();
    };

    const handleCancle = () => {
        let result = false;
        if (value.trim().length > 0) {
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
    };
    const renderHTML = (text) => {
        return <MarkDown text={text} />;
    };

    return (
        <div className={cx('wrapper', [reply])}>
            {!reply && isShow === false && (
                <div className={cx('label')} onClick={onOpenInput}>
                    {placeholder}
                </div>
            )}
            {isShow && (
                <div className={cx('comment')}>
                    <div className={cx('input-box')}>
                        <Avatar src="https://blog1203.netlify.app/images/avatar/avatar_56.png" />
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
                        <Button text onClick={handleCancle}>
                            Hủy
                        </Button>
                        <Button disabled={disabled} primary onClick={handleSubmit}>
                            {reply ? 'Tra loi' : 'Bình luận'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommentInput;
