import styles from './Write.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import MarkDown from '~/components/MarkDown';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Button from '~/components/button/Button';
import Model from '~/components/model';
import Export from './Export';
import useTitle from '~/hook/useTitle';
import { articleService, uploadService } from '~/services';
import useLimitInput from '~/hook/useLimitInput';
import { useNavigate, useParams } from 'react-router-dom';
import isConfictAuthor from '~/helper/isConflictAuthor';
const MAX_TITLE_LENGTH = 200;
const cx = classNames.bind(styles);

function Write() {
    useTitle('Write');
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [model, setModel] = useState(false);

    const url = process.env.REACT_APP_API_URL;
    const inputRef = useRef(null);

    // limit title
    useLimitInput(inputRef, MAX_TITLE_LENGTH, title);

    useEffect(() => {
        if (!!id) {
            const fetchAPI = async () => {
                const result = await articleService.getArticleById(id);
                if (result?.code) {
                    alert(result.message);
                    navigate(`/search`);
                } else {
                    if (isConfictAuthor(result?.author?.id)) {
                        alert('You are not author!');
                        return;
                    }
                    inputRef.current.innerHTML = result.title;
                    setContent(result.content);
                }
            };
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
                    name="title"
                    spellCheck={false}
                    contentEditable={true}
                    onPaste={handlePaste}
                    onInput={handleTitleChange}
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
                        name="content"
                        value={content}
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
                <Button primary large className={cx('btn')} onClick={() => setModel(true)}>
                    Xuất bản
                </Button>
            </div>

            {model && (
                <Model onBack={() => setModel(false)}>
                    <Export submitData={{ title: title, content }} isEdit={!!id} />
                </Model>
            )}
        </div>
    );
}

export default Write;
