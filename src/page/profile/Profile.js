import Avatar from '~/components/avatar';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import TopicItem from '../search/TopicItem';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <Avatar className={cx('avatar')} />
                    <h3 className={cx('name')}>DANH TUAN</h3>
                    <span className={cx('special-name')}>danhtuan3103</span>
                </div>
                <div className={cx('body')}>
                    <div className={cx('nav')}>
                        <div className={cx('topic-list')}>
                            {['Bài viết', 'Câu hỏi'].map((key, index) => {
                                return <TopicItem className={cx('nav-link')} key={index} topic={key} />;
                            })}
                        </div>
                    </div>
                    <div className={cx('content')}>
                        {[1, 2, 3, 4, 5, 6, 6, 7, 8].map((content, index) => {
                            return (
                                <div className={cx('card')} key={index}>
                                    <div className={cx('card-header')}>
                                        <p className={cx('card-title')}>Hello anh em</p>
                                        <span className={cx('card-mode')}>Public</span>
                                    </div>

                                    <span className={cx('card-type')}>question</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
