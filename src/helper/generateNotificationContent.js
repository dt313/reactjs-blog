const generateNotificationContent = (type, title) => {
    if (title && title.length > 50) {
        title = title.slice(0, 50);
    }
    switch (type) {
        case 'REACT_ARTICLE':
            return ` đã thích bài viết  <strong>${title}</strong> của bạn`;
        case 'REACT_QUESTION':
            return ` đã thích câu hỏi  <strong>${title}</strong> của bạn`;
        case 'REACT_COMMENT':
            return ` đã thích bình luận của bạn trong bài viết <strong>${title}</strong>`;
        case 'COMMENT_ARTICLE':
            return ` đã thích bình luận bài viết <strong>${title}</strong> của bạn`;
        case 'COMMENT_QUESTION':
            return ` đã bình luận trong câu hỏi <strong>${title}</strong> của bạn`;
        case 'REPLY_COMMENT':
            return ` đã trả lời bình luận của bạn trong bài viết <strong>${title}</strong> `;
        default:
            return '';
    }
};

export default generateNotificationContent;
