import Background from '../background';
import Button from '../button/Button';
import styles from './Confirm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Confirm({ title = 'No title', handleCancel, handleOK }) {
    return (
        <div className={cx('wrapper')}>
            <h5 className={cx('title')}>{title}</h5>

            <div className={cx('btn-block')}>
                <Button text>Cancel</Button>
                <Button primary className={cx('btn')}>
                    OK
                </Button>
            </div>
        </div>
    );
}

export default Confirm;
