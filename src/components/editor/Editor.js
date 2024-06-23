// import styles from './Input.module.scss';
// import classNames from 'classnames/bind';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
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
function Editor({ renderHTML, handleEditorChange, className, placeholder = '', content, autoFocus, defaultValue }) {
    const handleFocus = (e) => {
        const element = e.target;
        element.setSelectionRange(element.value.length, element.value.length);
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
            onFocus={(e) => handleFocus(e)}
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
