import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../hook/useApp';

/**
  * Require auth hoc
  * @return {ReactElement} children
  */
function RequireAuth({children}: { children: JSX.Element }) {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return children;
}

export {RequireAuth};
