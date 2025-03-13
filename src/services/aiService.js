import axios from '~/config/axios';
import setError from '~/helper/setError';

export const summarize = async (content) => {
    try {
        const res = await axios.post('/ai/summarization', { content });
        return res?.data;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to login');
    }
};
