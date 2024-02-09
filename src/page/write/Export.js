import classNames from 'classnames/bind';
import Button from '~/components/button';
import styles from './Write.module.scss';
import { memo, useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const cx = classNames.bind(styles);
function Export({ topics, setTopics, thumbnail, onThumbnail, onSubmit }) {
    const [input, setInput] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        console.log(topics);
        const input = inputRef.current;
        const handleKeyDown = (e) => {
            if (e.keyCode === 13) {
                const isValid = topics.some((t) => t === e.target.value);
                console.log(isValid);
                if (!isValid) {
                    setTopics((prev) => [...prev, e.target.value.trim()]);
                    setInput('');
                } else {
                    setIsDuplicate(true);
                }
            }
        };
        if (input) {
            input.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (input) {
                input.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [topics]);

    const handleDeleteTag = (name) => {
        const newTags = topics.filter((t) => t !== name);
        setTopics(newTags);
    };
    return (
        <div className={cx('export')}>
            <div className={cx('export-wrapper')}>
                <div className={cx('left')}>
                    <h4>Preview</h4>
                    <div className={cx('upload')}>
                        <p className={cx('description')}>
                            Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                        </p>

                        <span className={cx('upload-text')}>Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh</span>
                        <input type="file" hidden></input>
                    </div>

                    <h4>Or</h4>
                    <div className={cx('link-file')}>
                        {/* <span className={cx('label')}>Image Link</span> */}
                        <input
                            className={cx('link-input')}
                            placeholder="Copy link image in here"
                            value={thumbnail}
                            onChange={(e) => onThumbnail(e)}
                        />
                    </div>
                </div>
                <div className={cx('right')}>
                    <span className={cx('description')}>
                        Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì
                    </span>
                    <div className={cx('tags-block', isDuplicate && 'dup-error')}>
                        <div className={cx('tags')}>
                            {topics.length > 0 &&
                                topics.map((tag, index) => {
                                    return (
                                        <div className={cx('tag')} key={index}>
                                            <span className={cx('tag-name')}>{tag}</span>
                                            <IoIosClose
                                                className={cx('close-icon')}
                                                onClick={() => handleDeleteTag(tag)}
                                            />
                                        </div>
                                    );
                                })}

                            {topics.length < 5 && (
                                <input
                                    ref={inputRef}
                                    className={cx('topic-input')}
                                    placeholder={'Ví dụ : React, Nodejs, MongoDb'}
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                        setIsDuplicate(false);
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {<p className={cx('error')}>{isDuplicate && 'Bạn đã thêm thẻ này'}</p>}

                    <Button secondary className={cx('btn')} onClick={onSubmit}>
                        Xuất bản ngay
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default memo(Export);
