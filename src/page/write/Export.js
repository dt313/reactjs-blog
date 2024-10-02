import classNames from 'classnames/bind';
import Button from '~/components/button';
import styles from './Write.module.scss';
import { memo, useEffect, useRef, useState } from 'react';
import useAutoResize from '~/hook/useAutoResize';
import useLimitInput from '~/hook/useLimitInput';
import { articleService, uploadService } from '~/services';
import { useNavigate, useParams } from 'react-router-dom';
import TopicInput from '~/components/topicInput/TopicInput';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { useDispatch } from 'react-redux';
import getDateTimeLocal from '~/helper/getDateTimeLocal';

const MAX_META_TITLE_LENGTH = 100;
const MAX_META_DES_LENGTH = 160;
const cx = classNames.bind(styles);

function Export({ submitData, isEdit }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const dispatch = useDispatch();

    const [thumbnail, setThumbnail] = useState('');
    const [topics, setTopics] = useState([]);
    const [isSchedule, setIsSchedule] = useState(false);
    const [scheduleTime, setScheduleTime] = useState(getDateTimeLocal({}));

    const [meta, setMeta] = useState({
        metaTitle: submitData.title.trim(),
        description: submitData.content.trim(),
    });

    useEffect(() => {
        setMeta({
            metaTitle: submitData.title.trim(),
            description: submitData.content.trim(),
        });
    }, [submitData]);

    const metaTitleRef = useAutoResize(meta.metaTitle, submitData);
    const metaDesRef = useAutoResize(meta.description, submitData);

    const handleClickUploadImage = () => {
        fileRef.current.click();
    };

    const handleImageUpload = async (e) => {
        if (e.target.files[0]) {
            try {
                const result = await uploadService.uploadImage(e.target.files[0]);
                setThumbnail(`${process.env.REACT_APP_API_URL}/image/${result.data}`);
            } catch (error) {
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: error.message,
                        }),
                    ),
                );
            }
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            try {
                const result = await uploadService.uploadImage(e.dataTransfer.files[0]);
                setThumbnail(`${process.env.REACT_APP_API_URL}/image/${result.data}`);
            } catch (error) {
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: error.message,
                        }),
                    ),
                );
            }
        }
    };

    const handleDeleteTag = (name) => {
        const newTags = topics.filter((t) => t !== name);
        setTopics(newTags);
    };

    const handleChangeMeta = (e) => {
        const { name, value } = e.target;
        setMeta((pre) => ({ ...pre, [name]: value }));
    };

    // Submit
    const handleSubmit = async () => {
        try {
            const data = {
                ...submitData,
                ...meta,
                thumbnail,
                topics,
                publishAt: scheduleTime,
            };
            let result;
            if (isEdit) {
                result = await articleService.update(slug, data);
            } else {
                result = await articleService.create(data);
            }

            if (isSchedule) {
                navigate(`/profile/@me`);
            } else {
                navigate(`/article/${result?.slug}`);
            }
        } catch (error) {
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: error.message,
                    }),
                ),
            );
        }
    };

    useLimitInput(metaTitleRef, MAX_META_TITLE_LENGTH, meta.metaTitle);
    useLimitInput(metaDesRef, MAX_META_DES_LENGTH, meta.description);

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
                                <span className={cx('upload-text')} onClick={handleClickUploadImage}>
                                    Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh
                                </span>
                            </div>
                        ) : (
                            <div
                                className={cx('preview')}
                                onClick={handleClickUploadImage}
                                onDragEnter={(e) => handleDrag(e)}
                                onDragOver={(e) => handleDrag(e)}
                                onDrop={(e) => handleDrop(e)}
                            >
                                <img className={cx('preview-img')} src={thumbnail} alt="preview" />
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

                    <div className={cx('meta')}>
                        <textarea
                            className={cx('meta-title')}
                            rows={1}
                            ref={metaTitleRef}
                            name="metaTitle"
                            value={meta.metaTitle}
                            onChange={(e) => handleChangeMeta(e)}
                        />
                        {meta.metaTitle?.length > 60 && (
                            <span className={cx('count-length')}>{`${meta.metaTitle.length}/100`}</span>
                        )}
                        <textarea
                            className={cx('meta-des')}
                            ref={metaDesRef}
                            rows={1}
                            name="description"
                            value={meta.description}
                            onChange={(e) => handleChangeMeta(e)}
                            placeholder="Mô tả sẽ được hiển thị ở đây..."
                        />
                        {meta.description?.length > 80 && (
                            <span className={cx('count-length')}>{`${meta.description?.length}/160`}</span>
                        )}
                        <p className={cx('note')}>
                            <strong className={cx('note-title')}>Lưu ý: </strong>Chỉnh sửa tại đây sẽ thay đổi cách bài
                            viết được hiển thị tại trang chủ, tin nổi bật - Chứ không ảnh hưởng tới nội dung bài viết
                            của bạn.
                        </p>
                    </div>
                </div>
                <div className={cx('right')}>
                    <TopicInput
                        title="Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì."
                        topics={topics}
                        setTopics={setTopics}
                        handleDeleteTag={handleDeleteTag}
                    />

                    {!isSchedule && (
                        <div className={cx('actions')}>
                            <Button primary className={cx('btn')} onClick={handleSubmit}>
                                {isEdit ? 'Sửa bài viết' : 'Xuất bản ngay'}
                            </Button>
                            <Button secondary className={cx('btn')} onClick={() => setIsSchedule(true)}>
                                {'Lên lịch'}
                            </Button>
                        </div>
                    )}

                    {isSchedule && (
                        <div className={cx('schedule-box')}>
                            <div className={cx('label')}>Thời gian xuất bản:</div>
                            <div className={cx('schedule-input')}>
                                <input
                                    className={cx('input')}
                                    type="datetime-local"
                                    value={scheduleTime}
                                    onChange={(e) => setScheduleTime(e.target.value)}
                                />
                            </div>
                            <div className={cx('help')}>Korean Time (GMT+0900)</div>

                            <p>Bài viết này sẽ được xuất bản tự động theo thời gian đã lên lịch phía trên.</p>
                        </div>
                    )}

                    {isSchedule && (
                        <div className={cx('actions')}>
                            <Button primary className={cx('btn')} onClick={handleSubmit}>
                                Đặt lịch
                            </Button>
                            <Button
                                secondary
                                className={cx('btn')}
                                onClick={() => {
                                    setIsSchedule(false);
                                    setScheduleTime(getDateTimeLocal({}));
                                }}
                            >
                                Hủy lên lịch
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(Export);
