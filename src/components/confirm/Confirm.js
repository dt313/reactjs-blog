import Button from '../button/Button';
import styles from './Confirm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Confirm({ title = 'No title', handleOK, handleCancle }) {
    return (
        <div className={cx('wrapper')}>
            <h5 className={cx('title')}>{title}</h5>

            <div className={cx('btn-block')}>
                <Button text onClick={handleCancle}>
                    Cancel
                </Button>
                <Button primary className={cx('btn')} onClick={handleOK}>
                    OK
                </Button>
            </div>
        </div>
    );
}

export default Confirm;
