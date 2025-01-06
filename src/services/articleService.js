import axios from '~/config/axios';
import setError from '~/helper/setError';

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
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const searchFeature = async ({ searchValue = '', pageNumber, pageSize }) => {
    try {
        const res = await axios.get(
            `/articles/feature?searchValue=${searchValue}&&pageNumber=${pageNumber}&&pageSize=${pageSize}`,
        );
        return res?.data;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
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
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const getArticleById = async (id) => {
    try {
        const res = await axios.get(`/articles/${id}`);
        return res.data;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const getArticleBySlug = async (slug) => {
    try {
        const res = await axios.get(`/articles/slug/${slug}`);
        return res.data;
    } catch (error) {
        error = setError(error);
        console.log(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const getArticleBySlugWithAuth = async (slug) => {
    try {
        const res = await axios.get(`/articles/edit/slug/${slug}`);
        return res.data;
    } catch (error) {
        error = setError(error);
        console.log(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const getSuggestion = async (data) => {
    try {
        const res = await axios.post(`/articles/suggestion`, data);
        return res.data;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const getArticleByAuthor = async (id) => {
    try {
        const res = await axios.get(`/articles/author/${id}`);
        return res.data;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const create = async (data) => {
    try {
        const res = await axios.post(`/articles`, data);
        return res.data;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const update = async (slug, data) => {
    try {
        const res = await axios.put(`/articles/${slug}`, data);
        return res.data;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const publish = async (id) => {
    try {
        const res = await axios.post(`/articles/publish/${id}`);
        return res.data;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};

export const deleteArt = async (id) => {
    try {
        const res = await axios.delete(`/articles/${id}`);
        return res;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the article');
    }
};
