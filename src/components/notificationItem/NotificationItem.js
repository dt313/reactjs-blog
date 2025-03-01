import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import Avatar from '../avatar';
import calculateTime from '~/helper/calculateTime';
import generateNotificationContent from '~/helper/generateNotificationContent';
import { useNavigate } from 'react-router-dom';
import defaultFn from '~/utils/defaultFn';
import { tableType } from '~/config/types';

const cx = classNames.bind(styles);

function NotificationItem({ content, onClick = defaultFn }) {
    const navigator = useNavigate();
    const handleClickNotificationItem = async () => {
        const type = content.context_type;
        const contextSlug = content.context.slug;
        const directType = content.direct_object_type;
        const directId = content.direct_object_id;
        const hasParentId = content?.direct_object || null;

        onClick(content.is_readed, content.id);

        switch (type) {
            case tableType.article:
                if (directType === tableType.comment) {
                    if (hasParentId) {
                        navigator(
                            `/article/${contextSlug}?parent_id=${content?.direct_object.parent_id}&&direct_id=${content?.direct_object.direct_id}`,
                        );
                    } else {
                        navigator(`/article/${contextSlug}?direct_id=${directId}`);
                    }
                } else {
                    navigator(`/article/${contextSlug}`);
                }
            default:
                break;
        }
    };

    const text = generateNotificationContent(content?.type, content?.context?.title);

    return (
        <div className={cx('wrapper', content.is_readed && 'readed')} onClick={handleClickNotificationItem}>
            <Avatar className={cx('avatar')} src={content?.sender?.avatar} />
            <div className={cx('text-box')}>
                <p className={cx('content')}>
                    <strong
                        className={cx('bold-text')}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigator(`/profile/@${content.sender.username}`);
                            onClick();
                        }}
                    >
                        {content.sender.name || content.sender.username}
                    </strong>
                    <span dangerouslySetInnerHTML={{ __html: text }}></span>
                </p>
                <span className={cx('time')}>{calculateTime(content.created_at)}</span>
            </div>
        </div>
    );
}

NotificationItem.propTypes = {
    content: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default NotificationItem;
