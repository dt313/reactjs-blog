import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa6';

import { FaUser } from 'react-icons/fa';
import { MdOutlineSecurity } from 'react-icons/md';
import { MdSettingsApplications } from 'react-icons/md';

import { PiNewspaperClipping, PiBookBookmarkLight } from 'react-icons/pi';
import { tokenUtils } from '~/utils';
import ValidationOnChange from '~/helper/fieldValidation';

export const MAX_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const findArray = (length) => {
    if (length > MAX_ARRAY.length) {
        return MAX_ARRAY;
    }
    return MAX_ARRAY.slice(0, length);
};
export const getLengthOfPagination = (length) => {
    if (length % ARTICLE_PAGE_SIZE === 0) return length / ARTICLE_PAGE_SIZE;
    else return length / ARTICLE_PAGE_SIZE + 1;
};

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
        icon: <PiNewspaperClipping />,
    },
    {
        tag: 'bookmark',
        name: 'Lưu trữ',
        icon: <PiBookBookmarkLight />,
    },
];

export const noBookmarkProfileTag = [
    {
        tag: 'article',
        name: 'Bài viết',
        icon: <PiNewspaperClipping />,
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
        title: 'Twitter',
        icon: <FaTwitter />,
        fn: (path) => {
            window.open(`http://www.twitter.com/share?url=${path}`, '_blank');
        },
    },
    {
        title: 'Facebook',
        icon: <FaFacebook />,
        fn: (path) => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${path}`, '_blank');
        },
    },
    {
        title: 'Linkedin',
        icon: <FaLinkedin />,
        fn: (path) => {
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${path}`, '_blank');
        },
    },
];

export const createSettingMenu = () => {
    const user = tokenUtils.getUser();
    return [
        {
            title: 'Thông tin cá nhân',
            icon: <FaUser />,
            tag: 'info',
            content: {
                title: 'Thông tin cá nhân',
                description: 'Quản lí thông tin cá nhân của bạn',
                lists: [
                    {
                        title: 'Thông tin cơ bản',
                        description: 'Quản lí hiển thị, tên người dùng, bio và avatar của bạn',
                        items: [
                            {
                                title: 'Họ và tên',
                                content: user?.name,
                                name: 'name',
                                box: {
                                    headerTitle: 'Cập nhật tên của bạn',
                                    headerDescription:
                                        'Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn.',
                                    type: 'text',
                                    label: 'Họ và tên',
                                    content: user?.name,
                                    extraDescription:
                                        'Tên của bạn sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn.',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [
                                                ValidationOnChange.isRequired(),
                                                ValidationOnChange.minWord(2),
                                                ValidationOnChange.minLetterEachWord(2),
                                            ],
                                        });
                                    },
                                },
                            },
                            {
                                title: 'Tên người dùng',
                                content: user?.username,
                                name: 'username',
                                box: {
                                    headerTitle: 'Chỉnh sửa tên người dùng',
                                    headerDescription:
                                        'URL trang cá nhân của bạn sẽ bị thay đổi, bạn cũng sẽ không sử dụng được tên người dùng cũ để đăng nhập vào hệ thống nữa.',
                                    type: 'text',
                                    label: 'Tên người dùng (username)',
                                    content: user?.username,
                                    extraDescription: 'URL: https:/web-dev.blog.vn/danh-tuan',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [
                                                ValidationOnChange.isRequired(),
                                                ValidationOnChange.nonSpecialLetter(),
                                                ValidationOnChange.minLetter(5),
                                            ],
                                        });
                                    },
                                },
                            },
                            {
                                title: 'Giới thiệu',
                                content: user?.bio,
                                name: 'bio',
                                box: {
                                    headerTitle: 'Chỉnh sửa phần giới thiệu',
                                    headerDescription:
                                        'Phần giới thiệu (tiểu sử) được hiển thị tại trang cá nhân của bạn, giúp mọi người hiểu rõ hơn về bạn.',
                                    type: 'textarea',
                                    label: 'Giới thiệu (bio)',
                                    content: user?.bio,
                                    extraDescription: '',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [ValidationOnChange.maxLength(100)],
                                        });
                                    },
                                },
                            },
                            {
                                title: 'Avatar',
                                content: user?.avatar,
                                name: 'avatar',
                                isImage: true,
                                box: {
                                    headerTitle: 'Ảnh đại diện',
                                    headerDescription:
                                        'Ảnh đại diện giúp mọi người nhận biết bạn dễ dàng hơn qua các bài viết, bình luận, tin nhắn..',
                                    type: 'image',
                                    content: user?.avatar,
                                    extraDescription: '',
                                },
                            },
                        ],
                    },
                    {
                        title: 'Thông tin mạng xã hội',
                        description: 'Quản lí thông tin mạng xã hội của bạn',
                        items: [
                            {
                                title: 'Trang web cá nhân',
                                content: user?.web_link,
                                name: 'web_link',

                                isLarge: true,
                                box: {
                                    headerTitle: 'Trang web cá nhân',
                                    headerDescription:
                                        'Địa chỉ trang web cá nhân sẽ được hiển thị trên trang cá nhân của bạn. Ví dụ: https://example.com',
                                    type: 'text',
                                    content: user?.web_link,
                                    extraDescription: '',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [ValidationOnChange.isLinkWeb()],
                                        });
                                    },
                                },
                            },
                            {
                                title: 'Github',
                                content: user?.gh_link,
                                name: 'gh_link',
                                isLarge: true,

                                box: {
                                    headerTitle: 'Trang Github',
                                    headerDescription:
                                        'Địa chỉ trang github sẽ được hiển thị trên trang cá nhân của bạn. Ví dụ: https://github.com/username',
                                    type: 'text',
                                    content: user?.gh_link,
                                    extraDescription: '',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [ValidationOnChange.isSocialLink('github')],
                                        });
                                    },
                                },
                            },
                            {
                                title: 'Linkedin',
                                content: user?.lk_link,
                                name: 'lk_link',
                                isLarge: true,

                                box: {
                                    headerTitle: 'Trang Linkedin',
                                    headerDescription:
                                        'Địa chỉ trang linkedin sẽ được hiển thị trên trang cá nhân của bạn. Ví dụ: https://linkedin.com/in/username',
                                    type: 'text',
                                    content: user?.lk_link,
                                    extraDescription: '',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [ValidationOnChange.isSocialLink('linkedin')],
                                        });
                                    },
                                },
                            },
                            {
                                title: 'Facebook',
                                content: user?.fb_link,
                                name: 'fb_link',
                                isLarge: true,

                                box: {
                                    headerTitle: 'Trang Facebook',
                                    headerDescription:
                                        'Địa chỉ trang facebook sẽ được hiển thị trên trang cá nhân của bạn. Ví dụ: https://facebook.com/username',
                                    type: 'text',
                                    content: user?.fb_link,
                                    extraDescription: '',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [ValidationOnChange.isSocialLink('facebook')],
                                        });
                                    },
                                },
                            },
                            {
                                title: 'Instagram',
                                content: user?.ig_link,
                                name: 'ig_link',
                                isLarge: true,

                                box: {
                                    headerTitle: 'Trang Instagram',
                                    headerDescription:
                                        'Địa chỉ trang instagram sẽ được hiển thị trên trang cá nhân của bạn. Ví dụ: https://instagram.com/username',
                                    type: 'text',
                                    content: user?.ig_link,
                                    extraDescription: '',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [ValidationOnChange.isSocialLink('instagram')],
                                        });
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        },
        {
            title: 'Mật khẩu và bảo mật',
            icon: <MdOutlineSecurity />,
            tag: 'security',
            content: {
                title: 'Mật khẩu và bảo mật',
                description: 'Quản lí mật khẩu và cài đặt bảo mật',
                lists: [
                    {
                        title: 'Đăng nhập và bảo mật',
                        description: 'Quản lí mật khẩu và cài đặt bảo mật cho tài khoản của bạn',
                        items: [
                            {
                                title: 'Mật khẩu',
                                content: '**********',
                                name: 'password',
                                box: {
                                    headerTitle: 'Đặt lại mật khẩu',
                                    headerDescription:
                                        'Chúng tôi sẽ gửi link để bạn đặt lại mật khẩu vào gmail của bạn sau khi bạn nhập email chính xác',
                                    type: 'email',
                                    label: 'Nhập email của bạn',
                                    content: user?.email,
                                    extraDescription: '',
                                    validation: (value) => {
                                        return ValidationOnChange({
                                            value,
                                            rules: [ValidationOnChange.isSocialLink('email')],
                                        });
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        },
        {
            title: 'Ứng dụng',
            icon: <MdSettingsApplications />,
            tag: 'app',
            content: {
                title: 'Ứng dụng',
                description: 'Quản lí thông tin ứng dụng của bạn',
                lists: [
                    {
                        title: 'Theme ứng dụng và khác',
                        description: 'Quản lí mật khẩu và cài đặt bảo mật cho tài khoản của bạn',
                        items: [
                            {
                                title: 'Theme',
                                content: tokenUtils.getTheme() === 'dark' ? 'Tối' : 'Sáng',
                                box: {
                                    headerTitle: 'Chọn theme cho website',
                                    headerDescription:
                                        'Chọn giao diện phù hợp để cá nhân hóa trải nghiệm trang web của bạn.',
                                    type: 'theme',
                                    content: '',
                                    extraDescription: '',
                                },
                            },
                            {
                                title: 'Màu chính',
                                content: tokenUtils.getPrimaryColor(),
                                isColor: true,
                                box: {
                                    headerTitle: 'Chọn màu chính của website',
                                    headerDescription:
                                        'Chọn màu yêu thích của bạn để cá nhân hóa trải nghiệm trang web của bạn',
                                    type: 'primary-color',

                                    content: '',
                                    extraDescription: '',
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ];
};

export const skeletonColors = [
    {
        base: '#202020',
        hl: '#444',
    },
    {
        base: '#e8e8e8',
        hl: '#dddd',
    },
];

export const COMMENT_PAGE_SIZE = 10;
export const ARTICLE_PAGE_SIZE = 5;
export const BEST_PAGE_SIZE = 5;
export const COMMENT_REPLY_PAGE_SIZE = 10;
export const COMMENT_DEPTH = 2;

export default categories;
