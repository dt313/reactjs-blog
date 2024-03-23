import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import SearchItem from '~/components/searchItem';

import { FiSearch } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import useOutsideClick from '~/hook/useOutsideClick';
const cx = classNames.bind(styles);
const results = [
    {
        img: 'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png',
        title: 'Deploy Spring Boot cùng SQL Server lên Azure',
        author: 'Danh Tuan',
        type: 'artical',
    },
    {
        img: 'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png',
        title: 'Deploy Spring Boot cùng SQL Server lên Azure',
        author: 'Danh Tuan',
        type: 'artical',
    },
    {
        img: 'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png',
        title: 'Deploy Spring Boot cùng SQL Server lên Azure',
        author: 'Danh Tuan',
        type: 'artical',
    },
];
function Search({ value, onChangeInput, onClearInput }) {
    const inputRef = useRef();
    const [loading, setLoading] = useState(false);

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

            {/* {value && (
                <div className={cx('dropbox')} ref={boxRef}>
                    <h4 className={cx('title')}>Bài viết</h4>
                    {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}
                    <div className={cx('results')}>
                        {results.length > 0 &&
                            results.map((item, index) => {
                                return <SearchItem item={item} key={index} />;
                            })}
                        {!loading && results.length === 0 ? <p className={cx('no-data')}>Không có kết quả</p> : <></>}
                    </div>
                    {results.length > 0 && <p className={cx('seeall')}> See all</p>}
                </div>
            )} */}
        </div>
    );
}

export default Search;
