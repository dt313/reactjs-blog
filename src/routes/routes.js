import { lazy } from 'react';
import routes from '~/config/routes';

import DefaultLayout from '~/layout/DefaultLayout';
import OtherLayout from '~/layout/OtherLayout';
import OAuth2Redirect from '~/page/oauth2/OAuth2Redirect';

const Detail = lazy(() => import('~/page/detail/Detail'));
const Login = lazy(() => import('~/page/login'));
const SearchPage = lazy(() => import('~/page/search'));
const Write = lazy(() => import('~/page/write'));
const About = lazy(() => import('~/page/about'));
const Profile = lazy(() => import('~/page/profile'));
const Register = lazy(() => import('~/page/register/Register'));
const ForgotPassword = lazy(() => import('~/page/forgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('~/page/resetPassword/ResetPassword'));
const NotFound = lazy(() => import('~/page/404'));
const Home = lazy(() => import('~/page/home'));
const Setting = lazy(() => import('~/page/setting'));

const publicRoutes = [
    { path: routes.home, component: Home, layout: DefaultLayout },
    { path: routes.login, component: Login, layout: OtherLayout },
    { path: routes.login_error, component: Login, layout: OtherLayout },
    { path: routes.register, component: Register, layout: OtherLayout },
    { path: routes.about, component: About, layout: DefaultLayout },
    { path: routes.search, component: SearchPage, layout: DefaultLayout },
    { path: routes.article, component: Detail, layout: DefaultLayout },
    { path: routes.notfound, component: NotFound, layout: OtherLayout },
    { path: routes.error, component: NotFound, layout: OtherLayout },
    { path: routes.oauth2, component: OAuth2Redirect, layout: OtherLayout },
    { path: routes.forgotPassword, component: ForgotPassword, layout: OtherLayout },
    { path: routes.resetPassword, component: ResetPassword, layout: OtherLayout },
];
const protectedRoutes = [
    { path: routes.art_edit, component: Write, layout: DefaultLayout },
    { path: routes.write, component: Write, layout: DefaultLayout }, // protected
    { path: routes.profile, component: Profile, layout: DefaultLayout },
    { path: routes.setting, component: Setting, layout: OtherLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes, protectedRoutes };
