import { FaFacebookMessenger } from 'react-icons/fa6';
import { GrFacebookOption } from 'react-icons/gr';
import { AiFillInstagram } from 'react-icons/ai';
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
        tag: 'bookmark',
        name: 'Lưu trữ',
    },
];

export const noBookmarkProfileTag = [
    {
        tag: 'article',
        name: 'Bài viết',
    },
];

export const searchTag = [
    {
        tag: 'best',
        name: 'Nổi bật',
    },
    {
        tag: 'article',
        name: 'Tất cả',
    },
];

export const SHARE_MENU = [
    {
        title: 'Messenger',
        icon: <FaFacebookMessenger />,
        fn: (path) => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${path}`, '_blank');
        },
    },
    {
        title: 'Facebook',
        icon: <GrFacebookOption />,
        fn: (path) => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${path}`, '_blank');
        },
    },
    {
        title: 'Instagram',
        icon: <AiFillInstagram />,
        fn: (path) => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${path}`, '_blank');
        },
    },
];

export const COMMENT_PAGE_SIZE = 10;
export const ARTICLE_PAGE_SIZE = 5;
export const COMMENT_REPLY_PAGE_SIZE = 10;
export const COMMENT_DEPTH = 2;

export default categories;
