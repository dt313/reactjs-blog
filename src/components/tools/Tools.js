import classNames from 'classnames/bind';
import styles from './Tools.module.scss';
import { RiShareLine, RiLinksFill } from 'react-icons/ri';
import { MdOutlineModeComment } from 'react-icons/md';
import Tippy from '@tippyjs/react/headless';
import Reaction from '../reaction';
import getReactionIcon from '~/helper/getReactionIcon';
import { useCallback, useEffect, useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function Tools({
    className,
    onClickHeart = defaultFn,
    onClickComment = defaultFn,
    onClickShare = defaultFn,
    onClickLink = defaultFn,
    reactionType = 'NULL',
}) {
    const [visible, setVisible] = useState(false);
    const [placement, setPlacement] = useState('right');
    const [isHovering, setIsHovering] = useState(false);

    const reactArticle = (type) => {
        onClickHeart(type);
        setVisible(false);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isHovering) setVisible(true);
            else setVisible(false);
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [isHovering]);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setPlacement('top');
        }
    }, [window]);

    const ReactedIcon = useCallback(getReactionIcon(reactionType), [reactionType]);
    return (
        <div className={cx('tool', className)}>
            <Tippy
                interactive
                placement={placement}
                visible={visible}
                appendTo={'parent'}
                onClickOutside={() => setVisible(false)}
                render={(attrs) => (
                    <div
                        className={cx('box')}
                        tabIndex="1"
                        {...attrs}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <Reaction onClick={reactArticle} />
                    </div>
                )}
            >
                <div
                    className={cx('icon-block')}
                    onClick={() => {
                        onClickHeart(reactionType === 'NULL' ? 'LIKE' : 'NULL');
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <span className={cx('react-icon')}>
                        <ReactedIcon />
                    </span>
                </div>
            </Tippy>

            <Tippy
                placement={placement}
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
                placement={placement}
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
                placement={placement}
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
