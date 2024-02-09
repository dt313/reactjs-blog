import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { categories } from '~/config';
const cx = classNames.bind(styles);

function Home() {
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
                                            <td>{category.NS.name === '' ? '-' : category.NS.name}</td>
                                            <td>{category.DBMS.name === '' ? '-' : category.DBMS.name}</td>
                                            <td>{category.WEB.name === '' ? '-' : category.WEB.name}</td>
                                            <td>{category.APP.name === '' ? '-' : category.APP.name}</td>
                                            <td>{category.CLOUD.name === '' ? '-' : category.CLOUD.name}</td>
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
//    {
//        categories.map((category) => {
//            return (
//                <div className={cx('column')} key={category.id}>
//                    <h3 className={cx('title')}>{category.name}</h3>
//                    <ul className={cx('sub-data')}>
//                        {category.subcategories.map((sub) => {
//                            return (
//                                <li className={cx('sub-title')} key={sub.id}>
//                                    {sub.name}
//                                </li>
//                            );
//                        })}
//                    </ul>
//                </div>
//            );
//        });
//    }
