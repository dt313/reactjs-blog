import axios from 'axios';
import { tokenUtils, handleHTTPError } from '~/utils';

const url = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});

// refresh token function
async function refreshToken() {
    // Get Token from LocalStorage
    const token = instance.get('/refreshToken');
    console.log(token);

    // return {accessToken, refreshToken}
}

instance.interceptors.request.use(
    async function (config) {
        // console.log(config);
        // console.log(config.url.indexOf('/users'));
        if (config.url === '/auth/login' || config.url === '/users') {
            // no Authorization
            return config;
        }

        // console.log(config);
        config.headers.Authorization = `Bearer ${tokenUtils.getAccessToken()}`;
        // handle jwt expired
        return config;

        //
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
        return error;
    },
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        handleHTTPError(error.response.data);
        return Promise.reject(error);
    },
);

export default instance;
