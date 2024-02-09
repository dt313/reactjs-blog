import classNames from 'classnames/bind';
import styles from './AskBox.module.scss';
import Tools from '~/components/tools';
import MarkDown from '~/components/MarkDown';
import ArticleHeader from '~/components/article/ArticleHeader';
import Statistical from '~/components/statistical';
import CommentInput from '~/components/commentInput';
import Comments from '~/components/comments';
import { useState } from 'react';
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

~~~
`;

const comments = [
    {
        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
        content: 'Hello World',
        time: '4 days ago',
        reply: [
            {
                avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
                content: 'Hello World',
                time: '4 days ago',
                reply: [
                    {
                        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
                        content: 'Hello World',
                        time: '4 days ago',
                    },
                    {
                        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
                        content: 'Hello World',
                        time: '4 days ago',
                    },
                    {
                        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
                        content: 'Hello World',
                        time: '4 days ago',
                    },
                ],
            },
            {
                avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
                content: 'Hello World',
                time: '4 days ago',
            },
            {
                avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
                content: 'Hello World',
                time: '4 days ago',
                reply: [
                    {
                        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
                        content: 'Hello World',
                        time: '4 days ago',
                    },
                    {
                        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
                        content: 'Hello World',
                        time: '4 days ago',
                    },
                ],
            },
        ],
    },
    {
        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
        content: 'Hello World',
        time: '4 days ago',
    },
    {
        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
        content: 'Hello World',
        time: '4 days ago',
    },
    {
        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
        content: 'Hello World',
        time: '4 days ago',
    },
];
const cx = classNames.bind(styles);
function AskBox() {
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
