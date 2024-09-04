import axios from '~/config/axios';

export const getReactionByTableId = async (type, id) => {
    try {
        const res = await axios.get(`/${type}/${id}`);
        return res?.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed to fetch reactions');
    }
};

export const tongleReaction = async (data) => {
    try {
        const res = await axios.post(`/reaction/toggle`, data);
        return res;
    } catch (error) {
        throw new Error(error?.message || 'Failed to reaction');
    }
};
