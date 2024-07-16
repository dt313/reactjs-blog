import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtecedRoute({ children }) {
    const location = useLocation();
    const pathname = location.pathname;
    const { isAuthentication } = useSelector((state) => state.auth);
    // console.log('LOGGED : ', isAuthtication);
    if (!isAuthentication) {
        return <Navigate to={`/login?continue=${pathname}`} replace={true} />;
    }
    return <>{children}</>;
}

export default ProtecedRoute;
