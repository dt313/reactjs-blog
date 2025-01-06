import styles from './MarkDown.module.scss';
import classNames from 'classnames/bind';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useEffect, useState } from 'react';
import Button from '../button/Button';
const cx = classNames.bind(styles);

function Highlighter(props) {
    const [copied, setCopied] = useState(false);
    const { children, className, node, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');

    useEffect(() => {
        let timeout;
        if (copied) {
            timeout = setTimeout(() => {
                setCopied(false);
            }, 1000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [copied, children]);

    return (
        <div className={cx('hight-light', className)}>
            <CopyToClipboard text={children} onCopy={() => setCopied(true)}>
                <Button className={cx('copy-button')}>{copied ? 'Copied!' : 'Copy'}</Button>
            </CopyToClipboard>
            {match ? (
                <SyntaxHighlighter
                    className={cx('code-block')}
                    {...rest}
                    children={String(children).replace(/\n$/, '')}
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                />
            ) : (
                <code {...rest} className={cx('no-language')}>
                    {children}
                </code>
            )}
        </div>
    );
}

export default Highlighter;
