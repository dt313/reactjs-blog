import token from '~/utils/token';
const isConfictAuthor = (author = '') => {
    const userId = token.getUserId();
    console.log(author, userId);
    if (userId === author) return false;
    else return true;
};

export default isConfictAuthor;
