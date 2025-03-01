import PropTypes from 'prop-types';
import styles from './Pagination.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { findArray, getLengthOfPagination } from '~/config/uiConfig';

const cx = classNames.bind(styles);

function Pagination({ value, handleChangePage, length }) {
    const realArray = findArray(getLengthOfPagination(length));

    return (
        <div className={cx('wrapper')}>
            <button className={cx('page')} onClick={() => handleChangePage(value > 1 ? value - 1 : 1)}>
                &laquo;
            </button>
            {realArray.map((_value, index) => (
                <button
                    className={cx('page', { active: _value === value })}
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

Pagination.propTypes = {
    value: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    handleChangePage: PropTypes.func.isRequired,
};

export default memo(Pagination);
