import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SettingContent.module.scss';
import SettingTemplate from '~/components/settingTemplate';

const cx = classNames.bind(styles);

function SettingContent({ content = {} }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('title')}>{content.title}</h3>
                <p className={cx('des')}>{content.description}</p>
            </div>

            <div className={cx('content')}>
                {content?.lists.map((list, index) => (
                    <SettingTemplate key={index} list={list.items} headerText={list.title} desText={list.description} />
                ))}
            </div>
        </div>
    );
}

SettingContent.propTypes = {
    content: PropTypes.object.isRequired,
};

export default SettingContent;
