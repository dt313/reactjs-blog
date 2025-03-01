import { tokenUtils } from '~/utils';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export function login(payload) {
    const { accessToken, user } = payload;
    tokenUtils.setAccessToken(accessToken);
    tokenUtils.setUser(user);
    return {
        type: LOGIN,
        payload: user?.id,
    };
}

export function logout() {
    tokenUtils.clearToken();
    return {
        type: LOGOUT,
    };
}
