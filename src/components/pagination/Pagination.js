import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { ARTICLE_PAGE_SIZE } from '~/config/uiConfig';

const cx = classNames.bind(styles);
const MAX_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const findArray = (length) => {
    if (length > MAX_ARRAY.length) {
        return MAX_ARRAY;
    }
    return MAX_ARRAY.slice(0, length);
};
const getLengthOfPagination = (length) => {
    if (length % ARTICLE_PAGE_SIZE === 0) return length / ARTICLE_PAGE_SIZE;
    else return length / ARTICLE_PAGE_SIZE + 1;
};
function Pagination({ value, handleChangePage, length }) {
    const realArray = findArray(getLengthOfPagination(length));
    return (
        <div className={cx('wrapper')}>
            <button className={cx('page')} onClick={() => handleChangePage(value > 1 ? value - 1 : 1)}>
                &laquo;
            </button>
            {realArray.map((_value, index) => (
                <button
                    className={cx('page', { active: _value == value })}
                    key={index}
                    onClick={() => handleChangePage(_value)}
                >
                    {_value}
                </button>
            ))}

            <button
                className={cx('page')}
                onClick={() => handleChangePage(value < realArray.length ? value + 1 : realArray.length)}
            >
                &raquo;
            </button>
        </div>
    );
}

export default memo(Pagination);
