import { tokenUtils } from '~/utils';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export function login(payload) {
    console.log('LOGIN');

    const { accessToken, user } = payload;
    tokenUtils.setAccessToken(accessToken);
    tokenUtils.setUser(user);
    return {
        type: LOGIN,
        payload: user?.id,
    };
}

export function logout() {
    localStorage.clear();
    return {
        type: LOGOUT,
    };
}
