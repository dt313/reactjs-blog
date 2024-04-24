const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
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

const token = { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken, clearToken };

export default token;
