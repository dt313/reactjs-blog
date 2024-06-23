import axios from '~/config/axios';

export const searchFor = async ({ searchValue = '', topic, pageNumber, pageSize }) => {
    try {
        if (!topic) {
            const res = await axios.get(
                `/articles?searchValue=${searchValue}&&pageNumber=${pageNumber}&&pageSize=${pageSize}`,
            );
            return res?.data;
        } else {
            const res = await axios.get(
                `/articles/topic?name=${topic}&&pageNumber=${pageNumber}&&pageSize=${pageSize}`,
            );
            return res?.data;
        }
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const getLength = async ({ searchValue, topic }) => {
    try {
        if (!topic) {
            const res = await axios.get(`/articles/lengthByValue?searchValue=${searchValue}`);
            return res?.data;
        } else {
            const res = await axios.get(`/articles/lengthByTopic?name=${topic}`);
            return res?.data;
        }
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const getArticleById = async (id) => {
    try {
        const res = await axios.get(`/articles/${id}`);
        return res.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const getSuggestion = async (data) => {
    try {
        const res = await axios.post(`/articles/suggestion`, data);
        return res.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const getArticleByAuthor = async (id) => {
    try {
        const res = await axios.get(`/articles/author/${id}`);
        return res.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const create = async (data) => {
    try {
        const res = await axios.post(`/articles`, data);
        return res.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const update = async (id, data) => {
    try {
        const res = await axios.put(`/articles/${id}`, data);
        return res.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const deleteArt = async (id) => {
    try {
        const res = await axios.delete(`/articles/${id}`);
        return res;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};
