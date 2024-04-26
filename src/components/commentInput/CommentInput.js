import MarkDown from '~/components/MarkDown';
import styles from './CommentInput.module.scss';
import classNames from 'classnames/bind';
import Input from '~/components/input';
import { useState, useRef } from 'react';
import Button from '~/components/button';
import Avatar from '~/components/avatar';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function CommentInput({
    reply = false,
    defaultValue = '',
    onSubmit = defaultFn,
    placeholder = '',
    isShow = false,
    setIsShow,
}) {
    const [value, setValue] = useState(defaultValue);
    const [disabled, setDisabled] = useState(false);
    const ref = useRef();

    function handleEditorChange({ text }) {
        setValue(text);
    }

    const handleOnChange = (e) => {
        setValue(e.target.value);
        if (e.target.value.trim() !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const handleSubmit = (value) => {
        onSubmit(value);
        setValue('');
    };

    function handleEditorChange({ text }) {
        setValue(text);
    }

    const renderHTML = (text) => {
        return <MarkDown text={text} />;
    };

    return (
        <div className={cx('wrapper', [reply])}>
            {!reply && isShow == false && (
                <div
                    className={cx('label')}
                    onClick={() => {
                        setIsShow(true);
                    }}
                >
                    {placeholder}
                </div>
            )}

            {isShow && (
                <div className={cx('comment')}>
                    <div className={cx('input-box')}>
                        <Avatar src="https://blog1203.netlify.app/images/avatar/avatar_56.png" />
                        <div className={cx('text-input')}>
                            <Input
                                handleEditorChange={handleEditorChange}
                                renderHTML={renderHTML}
                                placeholder={placeholder}
                                className={cx('input')}
                                autoFocus={true}
                            />
                        </div>
                    </div>
                    <div className={cx('btn-box')}>
                        <Button text onClick={() => setIsShow(false)}>
                            Hủy
                        </Button>
                        <Button disabled={disabled} primary onClick={() => handleSubmit(value)}>
                            {reply ? 'Tra loi' : 'Bình luận'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommentInput;
