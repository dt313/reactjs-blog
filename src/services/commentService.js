import axios from '~/config/axios';
import setError from '~/helper/setError';

export const getAllCommentByType = async ({ type, id, pageNumber, pageSize }) => {
    try {
        const res = await axios.get(`/comments/${type}/${id}?pageNumber=${pageNumber}&&pageSize=${pageSize}`);
        return res?.data;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to fetch the comment');
    }
};

export const createComment = async ({ commentableId, publisher, commentType, content }) => {
    try {
        const res = await axios.post(`/comments`, { commentableId, publisher, commentType, content });
        return res?.data;
    } catch (error) {
        let err = setError(error);
        console.log(error);
        throw new Error(err || 'Failed to create comment');
    }
};

export const deleteComment = async (id) => {
    try {
        const res = await axios.delete(`/comments/${id}`);
        return res;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to delete comment');
    }
};
