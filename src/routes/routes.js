import routes from '~/config/routes';
import Detail from '~/page/detail/Detail';
import DefaultLayout from '~/layout/DefaultLayout';
import OtherLayout from '~/layout/OtherLayout';
import AskInput from '~/page/askInput';
import Home from '~/page/home';
import Login from '~/page/login';
import SearchPage from '~/page/search';
import Write from '~/page/write';
import AskBox from '~/page/askBox';
import About from '~/page/about';
import Profile from '~/page/profile';
import Register from '~/page/register/Register';

const publicRoutes = [
    { path: routes.home, component: Home, layout: DefaultLayout },
    { path: routes.login, component: Login, layout: OtherLayout },
    { path: routes.register, component: Register, layout: OtherLayout },
    { path: routes.ask, component: AskInput, layout: DefaultLayout },
    { path: routes.about, component: About, layout: DefaultLayout },
    { path: routes.search, component: SearchPage, layout: DefaultLayout },
    { path: routes.article, component: Detail, layout: DefaultLayout },
    { path: routes.ask_slug, component: AskBox, layout: DefaultLayout },
];
const protectedRoutes = [
    { path: routes.profile, component: Profile, layout: DefaultLayout },
    { path: routes.write, component: Write, layout: DefaultLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes, protectedRoutes };
