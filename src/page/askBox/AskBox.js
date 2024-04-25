import classNames from 'classnames/bind';
import styles from './AskBox.module.scss';
import Tools from '~/components/tools';
import MarkDown from '~/components/MarkDown';
import ArticleHeader from '~/components/article/ArticleHeader';
import Statistical from '~/components/statistical';
import CommentInput from '~/components/commentInput';
import Comments from '~/components/comments';
import { comments } from '~/config/comments';
import { useState } from 'react';
import useTitle from '~/hook/useTitle';
const markdown = `Here is some JavaScript code:
> Hello nclude popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.


~~~c
int a = 1;
~~~
`;

const cx = classNames.bind(styles);
function AskBox() {
    useTitle('Question');
    const [isInput, setIsInput] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {/* <div className={cx('tools')}>
                    <Tools />
                </div> */}
                <div className={cx('ask-block')}>
                    <div className={cx('ask')}>
                        <ArticleHeader author={'Danh Tuan'} large className={cx('ask-header')} />
                        <MarkDown text={markdown}></MarkDown>
                    </div>
                    <Statistical like="10" comment="20" className={cx('statistical')} around />
                    {/* <span className={cx('separate')}></span> */}
                    <div className={cx('comment-block')}>
                        <div className={cx('comment-input')}>
                            <CommentInput
                                placeholder="Viết bình luận của bạn..."
                                isShow={isInput}
                                setIsShow={setIsInput}
                            />
                        </div>
                        <div className={cx('comment-list')}>
                            <Comments list={comments} title="Comments" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AskBox;
