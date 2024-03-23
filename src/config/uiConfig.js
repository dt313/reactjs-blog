const categories = {
    header: ['NS', 'DBMS', 'WEB', 'APP', 'CLOUD'],
    subcategories: [
        ['API', 'Database', 'Backend', 'Android', 'Iaas'],
        ['Socket', 'Graph Database', 'Front-end', 'IOS', 'Paas'],
        ['TCP', 'KEY', 'Full-Stack', 'Native', 'Sass'],
        ['IP', 'Relation', 'Cor', 'Web-app', ''],
    ],
};

export const MENU = [
    {
        path: '/',
        title: 'home',
    },
    {
        path: '/search',
        title: 'search',
    },

    {
        path: '/ask',
        title: 'ask',
    },

    {
        path: '/write',
        title: 'write',
    },
    {
        path: '/login',
        title: 'login',
    },
    {
        path: '/about',
        title: 'about',
    },
    {
        path: '/profile',
        title: 'profile',
    },
];

export const profileTag = [
    {
        tag: 'article',
        name: 'Bài viết',
    },
    {
        tag: 'question',
        name: 'Câu hỏi',
    },

    {
        tag: 'bookmark',
        name: 'Lưu trữ',
    },
];

export const searchTag = [
    {
        tag: 'best',
        name: 'Nổi bật',
    },
    {
        tag: 'article',
        name: 'Bài viết',
    },
    {
        tag: 'question',
        name: 'Câu hỏi',
    },
];

export const cards = [
    {
        username: 'dt313',
        author: 'Tuan Danh',
        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
        thumbnail: 'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png',
        aid: 1,
        title: 'What is Lorem Ipsum?',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        like: 10,
        comment: 20,
    },

    {
        username: 'dt314',

        author: 'Non o',
        aid: 2,
        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
        thumbnail: 'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png',

        title: 'What is Lorem Ipsum?',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        like: 10,
        comment: 20,
    },
    {
        username: 'dt3',
        aid: 3,

        author: 'Honnh Hra',

        avatar: 'https://blog1203.netlify.app/images/avatar/avatar_56.png',
        thumbnail: 'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png',

        title: 'What is Lorem Ipsum?',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        like: 10,
        comment: 20,
    },
];

export const markdownEX = `Here is some JavaScript code:
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
export default categories;
