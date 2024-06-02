import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import Comment from '~/components/comment';
const cx = classNames.bind(styles);

function Comments({ list = [], title, className }) {
    return (
        <div className={cx('wrapper', className)}>
            {title && <h4 className={cx('title')}>{title}</h4>}
            <div className={cx('list')}>
                {list.map((comment, index) => {
                    return <Comment className={cx('comment')} key={index} comment={comment}></Comment>;
                })}
            </div>

            {/* <Confirm title="Hello nclude popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using." /> */}
        </div>
    );
}

export default Comments;
