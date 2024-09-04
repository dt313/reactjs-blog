import axios from '~/config/axios';

export const searchFor = async ({ searchValue, topic, pageNumber, pageSize }) => {
    try {
        if (!topic) {
            const res = await axios.get(
                `/questions?searchValue=${searchValue}&&pageNumber=${pageNumber}&&pageSize=${pageSize}`,
            );
            return res?.data;
        } else {
            const res = await axios.get(
                `/questions/topic?name=${topic}&&pageNumber=${pageNumber}&&pageSize=${pageSize}`,
            );
            return res?.data;
        }
    } catch (error) {
        throw new Error(error?.message || 'Failed');
    }
};

export const getLength = async ({ searchValue, topic }) => {
    try {
        if (!topic) {
            const res = await axios.get(`/questions/lengthByValue?searchValue=${searchValue}`);
            return res?.data;
        } else {
            const res = await axios.get(`/questions/lengthByTopic?name=${topic}`);
            return res?.data;
        }
    } catch (error) {
        throw new Error(error?.message || 'Failed');
    }
};

export const getById = async (id) => {
    try {
        const res = await axios.get(`/questions/${id}`);
        return res.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed');
    }
};

export const getByAuthor = async (id) => {
    try {
        const res = await axios.get(`/questions/author/${id}`);
        return res.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed');
    }
};

export const create = async (data) => {
    try {
        const res = await axios.post(`/questions`, data);
        return res.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed');
    }
};

export const update = async (id, data) => {
    try {
        const res = await axios.put(`/questions/${id}`, data);
        return res.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed');
    }
};

export const deleteQuestion = async (id) => {
    try {
        const res = await axios.delete(`/questions/${id}`);
        return res;
    } catch (error) {
        throw new Error(error?.message || 'Failed');
    }
};
