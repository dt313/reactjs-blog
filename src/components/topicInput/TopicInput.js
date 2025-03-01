import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './TopicInput.module.scss';
import { useState, useEffect, useRef, memo } from 'react';
import { IoIosClose } from 'react-icons/io';
import ValidationOnChange from '~/helper/fieldValidation';
import { ImPriceTag } from 'react-icons/im';
const cx = classNames.bind(styles);

function TopicInput({ title, handleDeleteTag, topics = [], setTopics, className }) {
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [input, setInput] = useState('');
    const [errorMes, setErrorMes] = useState('');

    const inputRef = useRef(null);

    // handle topic
    useEffect(() => {
        const input = inputRef.current;
        const handleKeyDown = (e) => {
            if (errorMes) return;
            if (e.keyCode === 13 && e.target.value !== '') {
                const isValid = topics.some((t) => t === e.target.value);
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
    }, [topics, errorMes]);

    const handleChangeInput = (e) => {
        const error = ValidationOnChange({
            value: e.target.value,
            rules: [ValidationOnChange.maxLength(25)],
        });
        setErrorMes(error);
        setInput(e.target.value);
        setIsDuplicate(false);
    };
    return (
        <div className={cx('wrapper', className)}>
            <span className={cx('title')}>{title}</span>
            <div className={cx('tags-block', (isDuplicate || errorMes) && 'dup-error')}>
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

            {<p className={cx('error')}>{isDuplicate ? 'Bạn đã thêm thẻ này' : errorMes && errorMes}</p>}
        </div>
    );
}

TopicInput.propTypes = {
    title: PropTypes.string.isRequired,
    handleDeleteTag: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired,
    setTopics: PropTypes.func.isRequired,
    className: PropTypes.string,
};
export default memo(TopicInput);
