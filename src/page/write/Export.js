import classNames from 'classnames/bind';
import Button from '~/components/button';
import styles from './Write.module.scss';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const cx = classNames.bind(styles);
function Export({ topics, setTopics, thumbnail, setThumbnail, onSubmit }) {
    const [input, setInput] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(false);
    const inputRef = useRef(null);
    const fileRef = useRef(null);

    const handleClickDes = () => {
        fileRef.current.click();
    };

    const handleImageUpload = (e) => {
        setThumbnail(URL.createObjectURL(e.target.files[0]));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(e.type);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setThumbnail(URL.createObjectURL(e.dataTransfer.files[0]));
        }
    };

    // handle topic
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
                        {!thumbnail ? (
                            <div
                                className={cx('upload-box')}
                                onDragEnter={(e) => handleDrag(e)}
                                onDragOver={(e) => handleDrag(e)}
                                onDrop={(e) => handleDrop(e)}
                            >
                                <p className={cx('description')}>
                                    Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                                </p>
                                <span className={cx('upload-text')} onClick={handleClickDes}>
                                    Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh
                                </span>
                            </div>
                        ) : (
                            <div
                                className={cx('preview')}
                                onClick={handleClickDes}
                                onDragEnter={(e) => handleDrag(e)}
                                onDragOver={(e) => handleDrag(e)}
                                onDrop={(e) => handleDrop(e)}
                            >
                                <img className={cx('preview-img')} src={thumbnail} />
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileRef}
                            hidden
                            onChange={(e) => handleImageUpload(e)}
                            accept="image/*"
                        ></input>
                    </div>

                    <div className={cx('display')}>
                        <input className={cx('display-title')} />
                        <input className={cx('display-des')} placeholder="Mô tả sẽ được hiển thị ở đây..." />
                        <p className={cx('note')}>
                            <strong className={cx('note-title')}>Lưu ý: </strong>Chỉnh sửa tại đây sẽ thay đổi cách bài
                            viết được hiển thị tại trang chủ, tin nổi bật - Chứ không ảnh hưởng tới nội dung bài viết
                            của bạn.
                        </p>
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
