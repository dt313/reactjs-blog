import PropTypes from 'prop-types';
import styles from './SearchPage.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function TopicItem({ className, topic, onClickTopic = defaultFn, active, icon }) {
    return (
        <p className={cx('topic', active && 'active', { [className]: className })} onClick={() => onClickTopic(topic)}>
            <span className={cx('icon')}>{icon}</span>
            {topic}
        </p>
    );
}

TopicItem.propTypes = {
    className: PropTypes.string,
    topic: PropTypes.string,
    onClickTopic: PropTypes.func,
    active: PropTypes.bool,
    icon: PropTypes.node,
};

export default memo(TopicItem);
