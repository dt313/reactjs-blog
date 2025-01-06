import styles from './Write.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import MarkDown from '~/components/markdown';
import { addToast, createToast } from '~/redux/actions/toastAction';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Button from '~/components/button/Button';
import CloseBox from '~/components/closeBox';
import Export from './Export';
import useTitle from '~/hook/useTitle';
import { articleService, uploadService } from '~/services';
import useLimitInput from '~/hook/useLimitInput';
import { useParams } from 'react-router-dom';
import isConfictAuthor from '~/helper/isConflictAuthor';
import { useDispatch } from 'react-redux';
import setError from '~/helper/setError';

const MAX_TITLE_LENGTH = 200;
const cx = classNames.bind(styles);

function Write() {
    useTitle('Write');
    const { slug } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isShowExport, setIsShowExport] = useState(false);

    const dispatch = useDispatch();

    const url = process.env.REACT_APP_API_URL;
    const inputRef = useRef(null);

    // limit title
    useLimitInput(inputRef, MAX_TITLE_LENGTH, title);

    const fetchAPI = async () => {
        try {
            const result = await articleService.getArticleBySlugWithAuth(slug);
            console.log(result);
            if (isConfictAuthor(result?.author?.id)) {
                dispatch(
                    addToast(
                        createToast({
                            type: 'warning',
                            content: 'You are not author!',
                        }),
                    ),
                );
                return;
            }
            inputRef.current.innerHTML = result.title;
            setTitle(result.title);
            setContent(result.content);
        } catch (error) {
            error = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'warning',
                        content: error.message,
                    }),
                ),
            );
        }
    };

    const handleOpenExport = () => {
        let isValid = true;
        if (title.length < 25 || title.length > 200) {
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: 'Title của bài viết phải từ 25 đến 200 kí tự !',
                    }),
                ),
            );
            isValid = false;
        } else if (content.length < 100) {
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: 'Nội dung phải lớn hơn 100 kí tự',
                    }),
                ),
            );
            isValid = false;
        }

        if (isValid) {
            setIsShowExport(true);
        }
    };

    useEffect(() => {
        if (!!slug) {
            fetchAPI();
        }
    }, []);

    const handlePaste = (event) => {
        event.preventDefault();
        var text = event.clipboardData.getData('text/plain');

        if (title.length + text.length > MAX_TITLE_LENGTH && title.length <= 200) {
            const residual = title.length + text.length - 200;
            text = text.substring(0, text.length - residual);
            setTitle(title + text);
            document.execCommand('insertText', false, text);
            return;
        }
        document.execCommand('insertText', false, text);
    };

    // handle change input
    const handleTitleChange = (e) => {
        const text = e.target.innerHTML;

        if (text.trim().length <= MAX_TITLE_LENGTH) {
            setTitle(text);
        } else {
            return;
        }
    };

    function handleEditorChange({ text }) {
        setContent(text);
    }

    const renderHTML = (text) => {
        return <MarkDown text={text} />;
    };

    const handleImageUpload = (file) => {
        return new Promise(async (resolve) => {
            try {
                const image = await uploadService.uploadImage(file);
                resolve(`${url}/image/${image.data}`);
            } catch (error) {
                error = setError(error);
                dispatch(
                    addToast(
                        createToast({
                            type: 'error',
                            content: error.message,
                        }),
                    ),
                );
            }
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('editor')}>
                <div
                    ref={inputRef}
                    className={cx('title-input')}
                    name="title"
                    spellCheck={false}
                    contentEditable={true}
                    onPaste={handlePaste}
                    onInput={handleTitleChange}
                    data-empty-text="Tiêu đề"
                ></div>
                <div className={cx('rmel-editor')}>
                    <MdEditor
                        style={{
                            marginBottom: '31px',
                            height: 'calc(100vh - 400px)',
                        }}
                        renderHTML={renderHTML}
                        onChange={handleEditorChange}
                        name="content"
                        value={content}
                        placeholder="Nội dung ở đây"
                        onImageUpload={handleImageUpload}
                        config={{
                            view: {
                                menu: true,
                                md: true,
                                html: true,
                                fullScreen: true,
                                hideMenu: true,
                                fontUnderline: false,
                            },
                            table: {
                                maxRow: 5,
                                maxCol: 6,
                            },
                            underline: false,
                            imageUrl: 'https://octodex.github.com/images/minion.png',
                            syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
                        }}
                    />
                </div>
            </div>

            <div className={cx('footer')}>
                <Button primary large className={cx('btn')} onClick={handleOpenExport}>
                    Xuất bản
                </Button>
            </div>

            <CloseBox state={isShowExport} onBack={() => setIsShowExport(false)}>
                <Export submitData={{ title: title, content }} isEdit={!!slug} />
            </CloseBox>
        </div>
    );
}

export default Write;
