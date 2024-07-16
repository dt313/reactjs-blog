import styles from './About.module.scss';
import classNames from 'classnames/bind';
import useTitle from '~/hook/useTitle';
const cx = classNames.bind(styles);

function About() {
    useTitle('About');
    return (
        <div className={cx('wrapper')}>
            <iframe className={cx('web')} src="https://dt-profile.vercel.app" title="Profile"></iframe>
        </div>
    );
}

export default About;
