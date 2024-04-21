export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(payload) {
    const { accessToken, refreshToken, data } = payload;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
        type: LOGIN,
        payload: data,
    };
}

export function logout() {
    localStorage.clear();
    return {
        type: LOGOUT,
    };
}
