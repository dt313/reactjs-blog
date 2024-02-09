import { useState } from 'react';
import styles from './AskInput.module.scss';
import classNames from 'classnames/bind';
import MarkDown from '~/components/MarkDown';
import Button from '~/components/button';
import Input from '~/components/input';

const cx = classNames.bind(styles);
function AskInput() {
    const [content, setContent] = useState('');

    function handleEditorChange({ text }) {
        setContent(text);
    }

    const renderHTML = (text) => {
        return <MarkDown text={text} />;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h3 className={cx('title')}>Câu hỏi của bạn là gì ?</h3>
                <div className={cx('editor')}>
                    <Input
                        className={cx('input')}
                        handleEditorChange={handleEditorChange}
                        renderHTML={renderHTML}
                        placeholder="Viet cau hoi cua ban o day"
                    />
                </div>

                <div className={cx('footer')}>
                    <Button primary large>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AskInput;
