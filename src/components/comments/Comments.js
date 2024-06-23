import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import Comment from '~/components/comment';

import { useEffect, useState } from 'react';
import comment from '~/components/comment';
const cx = classNames.bind(styles);

function Comments({ list = [], setList, title, className, hasLoadMore, onClickLoadMore, level }) {
    const handleAddComment = (comment) => {
        setList((prev) => [...prev, comment]);
    };

    const handleDeleteComment = (id) => {
        const newComments = list.filter((comment) => comment.id != id);
        setList(newComments);
    };

    return (
        <div className={cx('wrapper', className)}>
            {title && <h4 className={cx('title')}>{title}</h4>}
            <div className={cx('list')}>
                {list.map((comment, index) => {
                    return (
                        <Comment
                            className={cx('comment')}
                            key={index}
                            comment={comment}
                            level={level}
                            onAdd={handleAddComment}
                            onDelete={handleDeleteComment}
                        ></Comment>
                    );
                })}
                {hasLoadMore && (
                    <p className={cx('see-more')} onClick={onClickLoadMore}>
                        Xem thêm
                    </p>
                )}
            </div>
        </div>
    );
}

export default Comments;
