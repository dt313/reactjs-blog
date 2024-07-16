import { lazy } from 'react';
import routes from '~/config/routes';

import DefaultLayout from '~/layout/DefaultLayout';
import OtherLayout from '~/layout/OtherLayout';

const Detail = lazy(() => import('~/page/detail/Detail'));
const AskInput = lazy(() => import('~/page/askInput'));
const Login = lazy(() => import('~/page/login'));
const SearchPage = lazy(() => import('~/page/search'));
const Question = lazy(() => import('~/page/question'));
const Write = lazy(() => import('~/page/write'));
const About = lazy(() => import('~/page/about'));
const Profile = lazy(() => import('~/page/profile'));
const Register = lazy(() => import('~/page/register/Register'));
const NotFound = lazy(() => import('~/page/404'));
const Home = lazy(() => import('~/page/home'));

const publicRoutes = [
    { path: routes.home, component: Home, layout: DefaultLayout },
    { path: routes.login, component: Login, layout: OtherLayout },
    { path: routes.register, component: Register, layout: OtherLayout },
    { path: routes.about, component: About, layout: DefaultLayout },
    { path: routes.search, component: SearchPage, layout: DefaultLayout },
    { path: routes.article, component: Detail, layout: DefaultLayout },
    { path: routes.question, component: Question, layout: DefaultLayout },
    { path: routes.notfound, component: NotFound, layout: OtherLayout },
    { path: routes.error, component: NotFound, layout: OtherLayout },
];
const protectedRoutes = [
    { path: routes.write, component: Write, layout: DefaultLayout },
    { path: routes.art_edit, component: Write, layout: DefaultLayout },
    { path: routes.ask_edit, component: AskInput, layout: DefaultLayout },
    { path: routes.ask, component: AskInput, layout: DefaultLayout },
    { path: routes.profile, component: Profile, layout: DefaultLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes, protectedRoutes };
