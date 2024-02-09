import classNames from 'classnames/bind';
import styles from './Tools.module.scss';
import { RiHeart3Line, RiShareLine, RiLinksFill } from 'react-icons/ri';
import { MdOutlineModeComment } from 'react-icons/md';

const cx = classNames.bind(styles);

function Tools({ className }) {
    return (
        <div className={cx('tool', className)}>
            <div className={cx('icon-block')}>
                <RiHeart3Line className={cx('icon')} />
            </div>
            <div className={cx('icon-block')}>
                <MdOutlineModeComment className={cx('icon')} />
            </div>
            <div className={cx('icon-block')}>
                <RiShareLine className={cx('icon')} />
            </div>
            <div className={cx('icon-block')}>
                <RiLinksFill className={cx('icon')} />
            </div>
        </div>
    );
}

export default Tools;
