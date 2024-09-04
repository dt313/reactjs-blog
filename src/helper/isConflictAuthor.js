import token from '~/utils/token';
const isConfictAuthor = (author = 0) => {
    const userId = parseInt(token.getUserId());
    if (userId === parseInt(author)) return false;
    else return true;
};

export default isConfictAuthor;
