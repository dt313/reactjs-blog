import axios from '~/config/axios';

export const getReactionByTableId = async (type, id) => {
    try {
        const res = await axios.get(`/${type}/${id}`);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const getReactionLenghtByReactionTableId = async (id) => {
    try {
        const res = await axios.get(`/reaction/length/${id}`);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const tongleReaction = async (data) => {
    try {
        const res = await axios.post(`/reaction/toggle`, data);
        return res;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const checkReaction = async ({ reactionTableType, reactionTableId, userId }) => {
    try {
        const res = await axios.get(
            `/reaction/check?reactionTableType=${reactionTableType}&&reactionTableId=${reactionTableId}&&userId=${userId}`,
        );
        return res;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};
