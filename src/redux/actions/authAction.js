import { tokenUtils } from '~/utils';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export function login(payload) {
    const { accessToken, refreshToken, userId } = payload;
    tokenUtils.setAccessToken(accessToken);
    tokenUtils.setRefreshToken(refreshToken);
    tokenUtils.setUserId(userId);
    return {
        type: LOGIN,
        payload: userId,
    };
}

export function logout() {
    localStorage.clear();
    return {
        type: LOGOUT,
    };
}
