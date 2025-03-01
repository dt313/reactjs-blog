import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ReactionButton.module.scss';
import getReactionIconList from '~/helper/getReactionIconList';
import { useEffect, useState } from 'react';
import getReactionIcon from '~/helper/getReactionIcon';
import Overlay from '../overlay';

import CloseIcon from '~/assets/svg/close';
import Avatar from '../avatar';
import getReactionTabs from '~/helper/getReactionTab';
import Tab from './Tab';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ReactionButton({ className, list = [], total, reacted }) {
    const [icons, setIcons] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [currentTab, setCurrentTab] = useState('ALL');
    const [tabs, setTabs] = useState(getReactionTabs([]));
    const [isMoreTab, setIsMoreTab] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentList(list);
    }, [list]);

    useEffect(() => {
        setIcons(getReactionIconList(total === 0 ? 'DEFAULT' : list));
    }, [list]);

    const handleClickTab = (type, isSub = false) => {
        if (isSub) {
            const moreTab = tabs.filter((t) => t.type === 'MORE')[0];
            const tab = moreTab.tabs.filter((t) => t.type === type)[0];
            setCurrentTab(tab.type);
            setCurrentList(tab.list);
            setIsMoreTab(true);
        } else {
            setCurrentTab(type);
            const tab = tabs.filter((t) => t.type === type)[0];
            setCurrentList(tab.list);
            setIsMoreTab(false);
        }
    };

    useEffect(() => {
        if (window.innerWidth > 768) {
            setTabs(getReactionTabs(list, 4));
        } else if (window.innerWidth > 468) {
            setTabs(getReactionTabs(list, 3));
        } else if (window.innerWidth > 300) {
            setTabs(getReactionTabs(list, 2));
        } else {
            setTabs(getReactionTabs(list, 1));
        }
    }, [window, list]);

    return (
        <div
            className={cx('wrapper', total === 0 && 'no-underline', className)}
            onClick={() => setIsShow(true)}
            onMouseEnter={(e) => e.stopPropagation()}
        >
            {icons?.length > 0 &&
                icons.map((icon, index) => {
                    const Icon = getReactionIcon(icon);
                    return (
                        <span className={cx('icon-box')} key={index}>
                            <Icon width={20} height={20} />
                        </span>
                    );
                })}
            <span className={cx('total')}>
                {reacted ? (total === 1 ? 'Bạn' : `Bạn và ${total - 1} người khác`) : total}
            </span>

            <Overlay state={isShow} onClick={() => setIsShow(false)}>
                {isShow && (
                    <div className={cx('reactions-listbox')} onClick={(e) => e.stopPropagation()}>
                        <div className={cx('header')}>
                            <div className={cx('tabs')}>
                                {tabs.map((tab) => {
                                    return (
                                        <Tab
                                            key={tab.name}
                                            content={tab}
                                            isActive={currentTab === tab.type}
                                            onClick={handleClickTab}
                                            isMoreTab={isMoreTab}
                                        ></Tab>
                                    );
                                })}
                            </div>

                            <span className={cx('close-btn')} onClick={() => setIsShow(false)}>
                                <CloseIcon className={cx('close-icon')} />
                            </span>
                        </div>
                        <div className={cx('content')}>
                            {currentList.map((reaction, index) => {
                                const Icon = getReactionIcon(reaction.type);
                                return (
                                    <div className={cx('reacted-user')} key={reaction.id}>
                                        <div
                                            className={cx('avatar-box')}
                                            onClick={() => navigate(`/profile/@${reaction.reacted_user.username}`)}
                                        >
                                            <Avatar className={cx('avatar')} src={reaction.reacted_user.avatar} />
                                            <Icon className={cx('reacted-icon')} width={16} height={16} />
                                        </div>
                                        <span
                                            className={cx('reacted-name')}
                                            onClick={() => navigate(`/profile/@${reaction.reacted_user.username}`)}
                                        >
                                            {reaction.reacted_user.name || reaction.reacted_user.username}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </Overlay>
        </div>
    );
}

ReactionButton.propTypes = {
    className: PropTypes.string,
    list: PropTypes.array.isRequired,
    total: PropTypes.number,
    reacted: PropTypes.bool,
};
export default ReactionButton;
