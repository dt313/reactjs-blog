import axios from 'axios';
import { tokenUtils, handleHTTPError } from '~/utils';
import { redirectToNotFoundPage, sendError } from '~/utils/handleHTTPError';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const NO_AUTH_HEADER_URLS = ['/users', '/auth/oauth2/code/google'];
const OPTION_AUTH_HEADER_URLS = ['/article', '/comment', '/mail'];
instance.interceptors.request.use(
    async function (config) {
        // console.log(config);
        if (config.url === '/users/me') {
            config.headers.Authorization = `Bearer ${tokenUtils.getAccessToken()}`;
            return config;
        }

        if (config.url === '/users' || (config.url === '/articles/suggestion' && config.method === 'post')) {
            return config;
        }

        if (OPTION_AUTH_HEADER_URLS.some((url) => config.url.startsWith(url)) && config.method === 'get') {
            // console.log(tokenUtils.getAccessToken());
            if (!!tokenUtils.getAccessToken()) {
                config.headers.Authorization = `Bearer ${tokenUtils.getAccessToken()}`;
            }
            return config;
        }
        if (NO_AUTH_HEADER_URLS.some((url) => config.url.startsWith(url)) && config.method === 'get') {
            // Without Authentication
            // console.log(config.url, config.method);
            return config;
        }

        if (config.url.startsWith('/auth') || config.url.startsWith('/users/reset-password')) {
            return config;
        }
        // With Authentication
        config.headers.Authorization = `Bearer ${tokenUtils.getAccessToken()}`;
        return config;
    },

    function (error) {
        console.log(error);
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        if (response?.data?.code === 1000) return response.data;
        else throw new Error('Server Internal Error');
    },
    function (error) {
        // console.log(error);
        if (error.code === 'ERR_NETWORK') {
            tokenUtils.clearToken();
            // redirectToNotFoundPage();
            return Promise.reject(sendError('Sorry !! Internal server error'));
        }
        const error_message = handleHTTPError(error.response.data);
        if (error_message) return Promise.reject(error_message);
    },
);

export default instance;
