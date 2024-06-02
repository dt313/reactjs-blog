import styles from './Write.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect, useCallback } from 'react';
import MarkDown from '~/components/MarkDown';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Button from '~/components/button/Button';
import Model from '~/components/model';
import Export from './Export';
import useTitle from '~/hook/useTitle';
import Editor from 'react-markdown-editor-lite';
import { uploadService } from '~/services';
const MAX_TITLE_LENGTH = 200;
const cx = classNames.bind(styles);

function Write() {
    useTitle('Write');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [model, setModel] = useState(false);
    const [thumbnail, setThumbnail] = useState('');
    const [topics, setTopics] = useState([]);
    const fileRef = useRef();

    const inputRef = useRef(null);

    const handlePaste = (event) => {
        event.preventDefault();

        // Lấy nội dung đã được paste từ clipboard
        const pastedText = event.clipboardData.getData('text/plain');

        let text = title.concat(pastedText);

        if (text.length > 200) {
            text = text.substring(0, 200);
        }

        setTitle(text);

        // Dán nội dung vào div contenteditable
        document.execCommand('insertText', false, text);
    };

    useEffect(() => {
        const input = inputRef.current;

        const handleKeydown = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
            if (title.trim().length === MAX_TITLE_LENGTH) {
                if (e.key === 'Backspace' || e.key === 'Delete') {
                    return;
                }

                e.preventDefault();
            }
        };

        if (input) {
            input.addEventListener('keydown', handleKeydown);
        }

        return () => {
            if (input) {
                input.removeEventListener('keydown', handleKeydown);
            }
        };
    }, [title]);

    const handleInputChange = (e) => {
        const text = e.target.innerHTML;

        if (text.trim().length <= MAX_TITLE_LENGTH) {
            console.log(text.trim().length);
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

    // Export

    const handleSubmit = () => {
        setModel(true);
    };

    const handleCloseModel = useCallback(() => {
        setModel(false);
    }, []);
    const url = process.env.REACT_APP_API_URL;

    const handleImageUpload = (file) => {
        return new Promise(async (resolve) => {
            const image = await uploadService.uploadImage(file);
            console.log(image);
            resolve(`${url}/image/${image.data}`);
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('editor')}>
                <div
                    ref={inputRef}
                    className={cx('title-input')}
                    spellCheck={false}
                    contentEditable={true}
                    onPaste={handlePaste}
                    onInput={handleInputChange}
                    data-empty-text="Câu hỏi của bạn là gì ? "
                ></div>
                <div className={cx('rmel-editor')}>
                    <MdEditor
                        style={{
                            marginBottom: '31px',
                            height: 'calc(100vh - 400px)',
                        }}
                        renderHTML={renderHTML}
                        onChange={handleEditorChange}
                        placeholder="Giải thích ở đây"
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
                <Button primary large className={cx('btn')} onClick={handleSubmit}>
                    Xuất bản
                </Button>
            </div>

            {model && (
                <Model onBack={handleCloseModel}>
                    <Export
                        topics={topics}
                        setTopics={setTopics}
                        thumbnail={thumbnail}
                        setThumbnail={setThumbnail}
                        onSubmit={handleSubmit}
                    />
                </Model>
            )}
        </div>
    );
}

export default Write;
