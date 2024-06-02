import axios from 'axios';
const url = process.env.REACT_APP_API_URL;

export const uploadImage = async (file) => {
    try {
        const res = await axios.post(
            'http://localhost:8080/api/v1/upload-image',
            { file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error);
        console.log('Something Error');
    }
};
