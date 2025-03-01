import PropTypes from 'prop-types';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FiSearch } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import useOutsideClick from '~/hook/useOutsideClick';
const cx = classNames.bind(styles);

function Search({ value, onChangeInput, onClearInput }) {
    const inputRef = useRef();

    const handleClickOutside = () => {
        if (boxRef.current) {
            boxRef.current.style.display = 'none';
        }
    };

    const boxRef = useOutsideClick(handleClickOutside);

    const handleClear = () => {
        onClearInput();
        inputRef.current.focus();
    };
    return (
        <div className={cx('wrapper')}>
            <FiSearch className={cx('icon', 'search-icon')} />

            <input
                ref={inputRef}
                className={cx('search-input')}
                placeholder="Tìm kiếm ..."
                value={value}
                onChange={onChangeInput}
            />
            {!!value && (
                <span className={cx('icon-block')} onClick={handleClear}>
                    <MdClose className={cx('icon')} />
                </span>
            )}
        </div>
    );
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    onClearInput: PropTypes.func.isRequired,
};
export default Search;
