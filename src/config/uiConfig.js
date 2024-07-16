import { token } from '~/utils';

const categories = {
    header: ['NS', 'DBMS', 'WEB', 'APP', 'CLOUD'],
    subcategories: [
        ['API', 'Database', 'Backend', 'Android', 'Iaas'],
        ['Socket', 'Graph Database', 'Front-end', 'IOS', 'Paas'],
        ['TCP', 'KEY', 'Full-Stack', 'Native', 'Sass'],
        ['IP', 'Relation', 'Cor', 'Web-app', ''],
    ],
};

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

export const noBookmarkProfileTag = [
    {
        tag: 'article',
        name: 'Bài viết',
    },
    {
        tag: 'question',
        name: 'Câu hỏi',
    },
];

export const searchTag = [
    // {
    //     tag: 'best',
    //     name: 'Nổi bật',
    // },
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

export const COMMENT_PAGE_SIZE = 10;
export const ARTICLE_PAGE_SIZE = 10;
export const COMMENT_REPLY_PAGE_SIZE = 10;
export const COMMENT_DEPTH = 3;

export default categories;
