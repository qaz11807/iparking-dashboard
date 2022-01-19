import {useEffect, useState} from 'react';
import {useLocalStorage} from 'react-use-storage';
import {useAppDispatch, useAppSelector} from '../hook/useApp';
import {updateToken} from '../features/auth/authSlice';

/**
  * @return {ReactElement} caption here
  */
function useToken() {
    const [storageToken, setToken] = useLocalStorage<string | null>('jwt', null);
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const [first, setFirst] = useState(true);

    useEffect(() => {
        if (first) {
            setFirst(false);
            dispatch(updateToken(storageToken));
        }
    }, [storageToken]);

    useEffect(() => {
        if (!first) {
            setToken(token);
        }
    }, [token]);

    const clearToken = () => {
        setToken(null);
    };

    return {token, clearToken};
}

export {useToken};
