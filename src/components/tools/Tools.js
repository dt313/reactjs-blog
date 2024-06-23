import classNames from 'classnames/bind';
import styles from './Tools.module.scss';
import { RiHeart3Line, RiShareLine, RiLinksFill } from 'react-icons/ri';
import { MdOutlineModeComment } from 'react-icons/md';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Tools({
    className,
    onClickHeart = defaultFn,
    onClickComment = defaultFn,
    onClickShare = defaultFn,
    onClickLink = defaultFn,
    is_liked = true,
}) {
    return (
        <div className={cx('tool', className)}>
            <div className={cx('icon-block')} onClick={onClickHeart}>
                <RiHeart3Line className={cx('icon', is_liked && 'liked')} />
            </div>
            <div className={cx('icon-block')} onClick={onClickComment}>
                <MdOutlineModeComment className={cx('icon')} />
            </div>
            <div className={cx('icon-block')} onClick={onClickShare}>
                <RiShareLine className={cx('icon')} />
            </div>
            <div className={cx('icon-block')} onClick={onClickLink}>
                <RiLinksFill className={cx('icon')} />
            </div>
        </div>
    );
}

export default Tools;
