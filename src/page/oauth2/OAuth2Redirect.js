import { useNavigate, useSearchParams } from 'react-router-dom';
import { tokenUtils } from '~/utils';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/actions/authAction';
import setError from '~/helper/setError';
import { useEffect } from 'react';

function OAuth2Redirect() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigator = useNavigate();
    const dispacth = useDispatch();

    const fetchInfo = async () => {
        try {
            const result = await axios.get('http://localhost:8080/api/v1/users/me', {
                headers: {
                    Authorization: `Bearer ${searchParams.get('accessToken')}`, // Thay YOUR_TOKEN_HERE bằng token thực tế của bạn
                },
            });
            if (result.data.data) {
                dispacth(
                    login({
                        accessToken: searchParams.get('accessToken'),
                        user: result.data.data,
                    }),
                );
            }
        } catch (error) {
            let err = setError(error);
            alert(err);
            console.error('Error fetching user info:', err);
        }
    };

    useEffect(() => {
        if (searchParams.get('accessToken')) {
            fetchInfo().then(() => {
                const redirectPath = tokenUtils.getRedirectPath();
                navigator(redirectPath);
            });
        } else {
            navigator('/login');
        }
    }, []);

    return <></>;
}

export default OAuth2Redirect;
