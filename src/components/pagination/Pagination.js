import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

const cx = classNames.bind(styles);
const MAX_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];
const findArray = (length) => {
    if (length > MAX_ARRAY.length) {
        return MAX_ARRAY;
    }
    return MAX_ARRAY.slice(0, length);
};
function Pagination({ value, setValue }) {
    const realArray = findArray(4);
    // console.log(realArray);
    return (
        <div className={cx('wrapper')}>
            <button className={cx('page')} onClick={() => setValue(value > 1 ? value - 1 : 1)}>
                &laquo;
            </button>
            {realArray.map((_value, index) => (
                <button
                    className={cx('page', { active: _value == value })}
                    key={index}
                    onClick={() => setValue(_value)}
                >
                    {_value}
                </button>
            ))}

            <button
                className={cx('page')}
                onClick={() => setValue(value < realArray.length ? value + 1 : realArray.length)}
            >
                &raquo;
            </button>
        </div>
    );
}

export default memo(Pagination);
