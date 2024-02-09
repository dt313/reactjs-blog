import styles from './About.module.scss';
import Model from '~/components/model/Model';
import classNames from 'classnames/bind';
import Confirm from '~/components/confirm';

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <Confirm title="Helllo and em dsjah kjahs  asjkhd kjaskdhaskldhasl kdkjsa  " />
        </div>
    );
}

export default About;
