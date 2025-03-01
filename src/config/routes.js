const routes = {
    home: '/',
    login: '/login',
    login_error: '/login/oauth2/error',
    register: '/register',
    search: '/search',
    // ask_edit: '/ask/:id',
    // ask: '/ask',
    write: '/write',
    art_edit: '/write/:slug',
    about: '/about',
    profile: '/profile/:username',
    article: '/article/:slug',
    notfound: '/404',
    oauth2: '/oauth2/*',
    setting: '/setting',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    error: '/*',
};

export default routes;
