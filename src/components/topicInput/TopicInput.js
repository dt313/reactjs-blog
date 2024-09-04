import classNames from 'classnames/bind';
import styles from './TopicInput.module.scss';
import { useState, useEffect, useRef } from 'react';
import { IoIosClose } from 'react-icons/io';
const cx = classNames.bind(styles);

function TopicInput({ title, handleDeleteTag, topics = [], setTopics, className }) {
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [input, setInput] = useState('');

    const inputRef = useRef(null);

    // handle topic
    useEffect(() => {
        const input = inputRef.current;
        const handleKeyDown = (e) => {
            if (e.keyCode === 13 && e.target.value !== '') {
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

    const handleChangeInput = (e) => {
        setInput(e.target.value);
        setIsDuplicate(false);
    };
    return (
        <div className={cx('wrapper', className)}>
            <span className={cx('title')}>{title}</span>
            <div className={cx('tags-block', isDuplicate && 'dup-error')}>
                <div className={cx('tags')}>
                    {topics?.length > 0 &&
                        topics.map((tag, index) => {
                            return (
                                <div className={cx('tag')} key={index}>
                                    <span className={cx('tag-name')}>{tag}</span>
                                    <IoIosClose className={cx('close-icon')} onClick={() => handleDeleteTag(tag)} />
                                </div>
                            );
                        })}

                    {topics.length < 5 && (
                        <input
                            ref={inputRef}
                            className={cx('topic-input')}
                            placeholder={'Ví dụ : React, Nodejs, MongoDb'}
                            value={input}
                            onChange={handleChangeInput}
                        />
                    )}
                </div>
            </div>

            {<p className={cx('error')}>{isDuplicate && 'Bạn đã thêm thẻ này'}</p>}
        </div>
    );
}

export default TopicInput;
