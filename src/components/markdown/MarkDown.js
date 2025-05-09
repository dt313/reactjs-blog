import PropTypes from 'prop-types';
import MarkDownR from 'react-markdown';
import styles from './MarkDown.module.scss';
import classNames from 'classnames/bind';
import remarkGfm from 'remark-gfm';

import Highlighter from './Highlighter';
import { memo } from 'react';

const cx = classNames.bind(styles);
function MarkDown({ text = '', className }) {
    if (!text) return <br></br>;

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

MarkDown.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
};
export default memo(MarkDown);
