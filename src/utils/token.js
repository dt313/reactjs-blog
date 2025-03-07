const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const getUserId = () => {
    return JSON.parse(localStorage.getItem('user'))?.id;
};

const getAvatar = () => {
    return JSON.parse(localStorage.getItem('user'))?.avatar;
};

const setUser = (user) => {
    return localStorage.setItem('user', JSON.stringify(user));
};

const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
};

const setRefreshToken = (token) => {
    localStorage.setItem('resfreshToken', token);
};

const setRedirectPath = (path) => {
    localStorage.setItem('redirect', path);
};

const getRedirectPath = () => {
    return localStorage.getItem('redirect');
};

const clearToken = () => {
    const theme = getTheme();
    const pColor = getPrimaryColor();

    localStorage.clear();

    setTheme(theme);
    setPrimaryColor(pColor);
};

const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
};

const getTheme = () => {
    return localStorage.getItem('theme');
};

const setPrimaryColor = (color) => {
    localStorage.setItem('primary-color', color);
};

const getPrimaryColor = () => {
    return localStorage.getItem('primary-color');
};

export default {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    getRedirectPath,
    setRedirectPath,
    getUser,
    setUser,
    getAvatar,
    getUserId,
    clearToken,
    setTheme,
    getTheme,
    setPrimaryColor,
    getPrimaryColor,
};
