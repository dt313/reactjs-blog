import axios from 'axios';
import { token, handleHTTPError } from '~/utils';

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
        if (config.url.indexOf('/login') >= 0) {
            // no Authorization
            return config;
        }
        config.headers.Authorization = 'Bear ';

        // handle jwt expired

        return config;

        //
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        handleHTTPError(error.code, error.message);
    },
);

export default instance;
