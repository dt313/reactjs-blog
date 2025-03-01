import classNames from 'classnames/bind';
import styles from './SettingItem.module.scss';
import Image from '../image/Image';
import { FaChevronRight } from 'react-icons/fa';
import { memo } from 'react';

const cx = classNames.bind(styles);

function SettingItem({ content, isImage = false, isColor = false, borderLine = true, className, onClick }) {
    return (
        <div className={cx('wrapper', borderLine && 'border-line', className)} onClick={() => onClick(content.title)}>
            <h4 className={cx('title')}>{content.title}</h4>

            {isImage ? (
                <Image className={cx('img')} src={content.content} />
            ) : isColor ? (
                <span className={cx('color')}></span>
            ) : (
                <p className={cx('content')}>{content.content || 'Chưa cập nhật'}</p>
            )}

            <span className={cx('icon')}>
                <FaChevronRight />
            </span>
        </div>
    );
}

export default memo(SettingItem);
