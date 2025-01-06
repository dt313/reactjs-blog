// import styles from './Input.module.scss';
// import classNames from 'classnames/bind';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { uploadService } from '~/services';
import { addToast, createToast } from '~/redux/actions/toastAction';
import { useDispatch } from 'react-redux';
import setError from '~/helper/setError';

// const cx = classNames.bind(styles);

const PLUGINS = [
    'header',
    'divider',
    'font-bold',
    'divider',
    'font-italic',
    'divider',
    'block-code-block',
    'divider',
    'list-ordered',
    'divider',
    'list-unordered',
    'divider',
    'block-wrap',
    'divider',
    'image',
    'divider',
    'clear',
    'mode-toggle',
    'divider',
    'full-screen',
];
function Editor({ renderHTML, handleEditorChange, className, placeholder = '', content, defaultValue }) {
    // const handleFocus = (e) => {
    //     const element = e.target;
    //     element.setSelectionRange(element.value.length, element.value.length);
    // };

    const dispatch = useDispatch();

    const handleImageUpload = (file) => {
        const url = process.env.REACT_APP_API_URL;
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
        <MdEditor
            value={content}
            plugins={PLUGINS}
            className={className}
            defaultValue={defaultValue}
            renderHTML={renderHTML}
            onChange={handleEditorChange}
            placeholder={placeholder}
            autoFocus
            onImageUpload={handleImageUpload}
            // onFocus={(e) => handleFocus(e)}
            config={{
                view: {
                    menu: true,
                    md: true,
                    html: false,
                    fullScreen: false,
                    hideMenu: true,
                },
            }}
        />
    );
}

export default Editor;
