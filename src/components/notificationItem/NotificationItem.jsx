import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import Avatar from '../avatar';
import calculateTime from '~/helper/calculateTime';
import generateNotificationContent from '~/helper/generateNotificationContent';
import { useNavigate } from 'react-router-dom';
import defaultFn from '~/utils/defaultFn';
import { notificationService } from '~/services';
import { useDispatch } from 'react-redux';
import { readNotification } from '~/redux/actions/notificationAction';

const cx = classNames.bind(styles);

function NotificationItem({ content, onClick = defaultFn }) {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const handleClickNotificationItem = async () => {
        const type = content.contextType;
        const contextId = content.contextId;

        onClick();
        if (type === 'ARTICLE') {
            navigator(`/article/${contextId}`);
        } else if (type === 'QUESTION') {
            navigator(`/question/${contextId}`);
        }
    };

    const text = generateNotificationContent(content.type, content.context);
    return (
        <div className={cx('wrapper', content.is_readed && 'readed')} onClick={handleClickNotificationItem}>
            <Avatar className={cx('avatar')} />
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
                        {content.sender.username}
                    </strong>
                    <span dangerouslySetInnerHTML={{ __html: text }}></span>
                </p>
                <span className={cx('time')}>{calculateTime(content.createdAt)}</span>
            </div>
        </div>
    );
}

export default NotificationItem;
