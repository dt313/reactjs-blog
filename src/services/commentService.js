import axios from '~/config/axios';

export const getAllCommentByType = async ({ type, id, pageNumber, pageSize }) => {
    try {
        const res = await axios.get(`/comments/${type}/${id}?pageNumber=${pageNumber}&&pageSize=${pageSize}`);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const createComment = async (data) => {
    try {
        const res = await axios.post(`/comments`, data);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const getCountOfCommentByType = async ({ type, id }) => {
    try {
        const res = await axios.get(`/comments/length/${type}/${id}`);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const deleteComment = async (id) => {
    try {
        const res = await axios.delete(`/comments/${id}`);
        return res;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};
