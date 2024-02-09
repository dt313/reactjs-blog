import styles from './SearchPage.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};
function TopicItem({ className, topic, onClickTopic = defaultFn }) {
    return (
        <p className={cx('topic', { [className]: className })} onClick={() => onClickTopic(topic)}>
            {topic}
        </p>
    );
}

export default memo(TopicItem);
