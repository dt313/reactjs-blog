import axios from '~/config/axios';

export const toggleBookmark = async (data) => {
    try {
        const res = await axios.post('/bookmark/toggle', data);
        return res;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const checkBookmark = async ({ tableType, bookmarkTableId, userId }) => {
    try {
        const res = await axios.get(
            `/bookmark/check?tableType=${tableType}&&bookmarkTableId=${bookmarkTableId}&&userId=${userId}`,
        );
        return res;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const getAllBookmarkedArticleByUserId = async (id) => {
    try {
        const res = await axios.get(`/bookmark/byUser/${id}`);
        return res.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};
