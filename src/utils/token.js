const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

const getUserId = () => {
    return localStorage.getItem('userId');
};

const setUserId = (id) => {
    return localStorage.setItem('userId', id);
};

const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
};

const setRefreshToken = (token) => {
    localStorage.setItem('resfreshToken', token);
};

const clearToken = () => {
    localStorage.clear();
};

export default {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    getUserId,
    setUserId,
    clearToken,
};
