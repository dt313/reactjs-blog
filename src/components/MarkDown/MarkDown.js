import MarkDownR from 'react-markdown';
import styles from './MarkDown.module.scss';
import classNames from 'classnames/bind';
import remarkGfm from 'remark-gfm';

import Highlighter from './Highlighter';

const cx = classNames.bind(styles);
function MarkDown({ text = '', className }) {
    const components = {
        code: Highlighter,
        em(props) {
            const { node, ...rest } = props;
            return <i style={{ color: 'red' }} {...rest} />;
        },
    };

    return (
        <MarkDownR
            remarkPlugins={[remarkGfm]}
            className={cx('wrapper', className)}
            children={text}
            components={components}
        ></MarkDownR>
    );
}

export default MarkDown;
