import axios from '~/config/axios';
import setError from '~/helper/setError';

export const toggleBookmark = async (data) => {
    try {
        const res = await axios.post('/bookmark/toggle', data);
        return res;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to bookmark');
    }
};

export const getAllBookmarkedArticleByUserId = async (id) => {
    try {
        const res = await axios.get(`/bookmark/byUser/${id}`);
        return res.data;
    } catch (error) {
        error = setError(error);
        throw new Error(error?.message || 'Failed to fetch the bookmark');
    }
};
