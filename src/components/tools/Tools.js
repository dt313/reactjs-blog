import classNames from 'classnames/bind';
import styles from './Tools.module.scss';
import { RiHeart3Line, RiShareLine, RiLinksFill } from 'react-icons/ri';
import { MdOutlineModeComment } from 'react-icons/md';
import Tippy from '@tippyjs/react/headless';

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
            <Tippy
                placement="right"
                render={(attrs) => (
                    <div className={cx('box')} tabIndex="-1" {...attrs}>
                        <span className={cx('tippy')}>Thả tim</span>
                    </div>
                )}
            >
                <div className={cx('icon-block')} onClick={onClickHeart}>
                    <RiHeart3Line className={cx('icon', is_liked && 'liked')} />
                </div>
            </Tippy>
            <Tippy
                placement="right"
                render={(attrs) => (
                    <div className={cx('box')} tabIndex="-1" {...attrs}>
                        <span className={cx('tippy')}>Mở comment</span>
                    </div>
                )}
            >
                <div className={cx('icon-block')} onClick={onClickComment}>
                    <MdOutlineModeComment className={cx('icon')} />
                </div>
            </Tippy>
            <Tippy
                placement="right"
                render={(attrs) => (
                    <div className={cx('box')} tabIndex="-1" {...attrs}>
                        <span className={cx('tippy')}>Chia sẻ</span>
                    </div>
                )}
            >
                <div className={cx('icon-block')} onClick={onClickShare}>
                    <RiShareLine className={cx('icon')} />
                </div>
            </Tippy>
            <Tippy
                placement="right"
                render={(attrs) => (
                    <div className={cx('box')} tabIndex="-1" {...attrs}>
                        <span className={cx('tippy')}>Sao chép link</span>
                    </div>
                )}
            >
                <div className={cx('icon-block')} onClick={onClickLink}>
                    <RiLinksFill className={cx('icon')} />
                </div>
            </Tippy>
        </div>
    );
}

export default Tools;
