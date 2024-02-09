import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import MarkDown from '~/components/MarkDown';
import Tools from '~/components/tools';
import ArticleHeader from '~/components/article/ArticleHeader';

import Suggestion from '~/components/suggestion';
import Statistical from '~/components/statistical';
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('tools')}>
                    <Tools className={cx('article-tools')} />
                </div>
                <div className={cx('md-editor')}>
                    <h1 className={cx('title')}>{article?.title}</h1>
                    <div className={cx('article-header')}>
                        <ArticleHeader large author={article?.author} avatar={article?.avatar} />
                    </div>
                    <div>
                        <MarkDown className={cx('preview')} text={article?.description} />
                    </div>
                    <div className={cx('statistical')}>
                        <Statistical like={article?.like} comment={article.comment} />
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

                {/* {commentModel && (
                    <Overlay onClose={handleClose}>
                    <Comments
                    setCountComments={setComments}
                    onClose={handleClose}
                    blogId={id}
                    author={blog?.author?._id}
                    />
                    </Overlay>
                )} */}
            </div>
            <Suggestion className={cx('suggestion')} topics={article?.topic} author={article?.author} />
        </div>
    );
}

export default Detail;
