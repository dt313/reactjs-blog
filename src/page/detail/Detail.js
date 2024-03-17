import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import MarkDown from '~/components/MarkDown';
import Tools from '~/components/tools';
import ArticleHeader from '~/components/article/ArticleHeader';
import Suggestion from '~/components/suggestion';
import Statistical from '~/components/statistical';
import CommentInput from '~/components/commentInput';
import Comments from '~/components/comments';
import { comments } from '~/config/comments';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

const cx = classNames.bind(styles);
const markdown = `Here is some JavaScript code:
> Hello nclude popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.


~~~js
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown@9?bundle/hello/hdhdh'
</script>
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown@9?bundle/hello/hdhdh'
</script>

<script type="module">
  import Markdown from 'https://esm.sh/react-markdown@9?bundle/hello/hdhdh'
</script>
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown@9?bundle/hello/hdhdh'
</script>
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown@9?bundle/hello/hdhdh'
</script>
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown@9?bundle/hello/hdhdh'
</script>
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown@9?bundle/hello/hdhdh'
</script>
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown@9?bundle/hello/hdhdh'
</script>
~~~
`;
const article = {
    author: 'Honnh Jonh',
    avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
    thumbnail: 'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png',
    title: 'What is Lorem Ipsum?',
    description: markdown,
    like: 10,
    comment: 20,
    topic: ['hello', 'world'],
};

function Detail() {
    const [isInput, setIsInput] = useState(false);
    const [isShowCommentsBox, setIsShowCommentsBox] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('tools')}>
                    <Tools
                        className={cx('article-tools')}
                        onClickComment={() => setIsShowCommentsBox(!isShowCommentsBox)}
                    />
                </div>
                <div className={cx('md-editor')}>
                    <h1 className={cx('title')}>{article?.title}</h1>
                    <div className={cx('article-header')}>
                        <ArticleHeader
                            className={cx('header')}
                            large
                            author={article?.author}
                            avatar={article?.avatar}
                        />
                    </div>
                    <div>
                        <MarkDown className={cx('preview')} text={article?.description} />
                    </div>
                    <div className={cx('statistical')}>
                        <Statistical like={article?.like} comment={article.comment} isLiked={true} />
                    </div>
                    <div className={cx('topics')}>
                        <h5 className={cx('topics-title')}>Topics : </h5>

                        {article?.topic?.map((topic, index) => {
                            return (
                                <span key={index} className={cx('topic')}>
                                    {topic}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {isShowCommentsBox && (
                    <div className={cx('overlay')} onClick={(e) => setIsShowCommentsBox(false)}>
                        <div
                            className={cx('comments-wrapper')}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <span className={cx('close')}>
                                <MdClose className={cx('close-icon')} onClick={(e) => setIsShowCommentsBox(false)} />
                            </span>

                            <div className={cx('comments-detail')}>
                                <div className={cx('comments-count')}>
                                    4 Comments
                                    <p className={cx('comments-des')}>
                                        (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
                                    </p>
                                </div>

                                <div className={cx('comment-block')}>
                                    <div className={cx('comment-input')}>
                                        <CommentInput
                                            placeholder="Viết bình luận của bạn..."
                                            isShow={isInput}
                                            setIsShow={setIsInput}
                                        />
                                    </div>
                                    <div className={cx('comment-list')}>
                                        <Comments list={comments} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Suggestion className={cx('suggestion')} topics={article?.topic} author={article?.author} />
        </div>
    );
}

export default Detail;
