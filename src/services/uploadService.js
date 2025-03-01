import axios from 'axios';
import { tokenUtils } from '~/utils';
import setError from '~/helper/setError';

export const uploadImage = async (file) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/upload-image`,
            { file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${tokenUtils.getAccessToken()}`,
                },
            },
        );
        return res.data;
    } catch (error) {
        let err = setError(error.response.data);
        throw new Error(err || 'Failed to upload image');
    }
};
