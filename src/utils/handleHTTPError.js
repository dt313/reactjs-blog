import tokenUtils from './token';
import { authService } from '~/services';

export const redirectToNotFoundPage = () => {
    if (typeof window !== 'undefined') {
        window.location.href = '/404';
    }
};

export const redirectToLoginPage = (path) => {
    if (path) {
        window.location.href = `/login?continue=${path}`;
    } else {
        window.location.href = '/login';
    }
};

const getPath = () => {
    let result = '';

    result = window.location.pathname || '';
    result += window.location.search || '';
    return result;
};

const refreshToken = async () => {
    const { token, user } = await authService.refreshToken(tokenUtils.getAccessToken());
    console.log(token);
    if (token && user) {
        tokenUtils.setAccessToken(token);
        tokenUtils.setUser(user);
    }

    window.location.reload();
};

export const sendError = (message) => {
    return { message };
};

export default function handleHTTPError(error) {
    console.log('Http Error :', error);

    switch (error.code) {
        case 1001:
        case 1005:
            tokenUtils.clearToken();
            redirectToLoginPage(getPath());
            return sendError(error.message);
        case 1006:
            refreshToken();
            break;

        default:
            return sendError(error.message);
    }
}
