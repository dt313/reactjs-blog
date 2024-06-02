import MarkDownR from 'react-markdown';
import styles from './MarkDown.module.scss';
import classNames from 'classnames/bind';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const cx = classNames.bind(styles);
function MarkDown({ text = '', className }) {
    // console.log(text);
    return (
        <MarkDownR
            remarkPlugins={[remarkGfm]}
            className={cx('wrapper', className)}
            children={text}
            components={{
                code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                        <SyntaxHighlighter
                            className={cx('code-block')}
                            {...rest}
                            children={String(children).replace(/\n$/, '')}
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                        />
                    ) : (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    );
                },
            }}
        ></MarkDownR>
    );
}

export default MarkDown;
