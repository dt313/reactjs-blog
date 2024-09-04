import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { categories } from '~/config';
import useTitle from '~/hook/useTitle';
const cx = classNames.bind(styles);

function Home() {
    useTitle('Home');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <p className={cx('intro-text')}>
                    Đây là nền tảng hỏi và trả lời những câu hỏi tại sao liên quan đến lĩnh vực technology và devoloper.
                    Ở đây bạn có thể tìm kiếm câu trả lời hoặc đặt câu hỏi (Đang cập nhật ... )
                </p>
                <h1 className={cx('main-text')}>
                    <span>?</span> 10.000 câu hỏi tại sao
                </h1>
                <div className={cx('table-container')}>
                    <div className={cx('table')}>
                        <table>
                            <thead>
                                <tr>
                                    {categories.header.map((category, index) => {
                                        return <th key={index}>{category}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {categories.subcategories.map((category, index) => {
                                    return (
                                        <tr key={index}>
                                            {category.map((item, index) => {
                                                return <td key={index}>{item || '-'}</td>;
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
