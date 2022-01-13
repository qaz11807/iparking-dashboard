import React from 'react';
import {useEffect} from 'react';
import {login} from '../api/auth';
import {Navigate, useLocation} from 'react-router-dom';
import {useLocalStorage} from 'react-use-storage';
import {AlertParams} from '../componment/MessageAlert';
import {useAuth, AuthContext} from '../hook/useAuth';
import Repos from '../api/service';
import {UserRepo} from '../api/service';
import {User} from '../models/user';
/**
  * Auth Provider hoc
  * @return {ReactElement} children
  */
function AuthProvider({children}: { children: React.ReactNode }) {
    const [token, setToken] = useLocalStorage<string | null>('jwt', null);
    const [user, setUser] = React.useState<User | null>(null);

    Repos.forEach((repo)=>{
        repo.updateToken(token);
    });

    useEffect(() => {
        if (!user && token) {
            UserRepo.getAxios().get('/my').then((response)=>setUser(response.data.data));
        }
    }, [token]);

    const signin = (username: string, password: string, callback: ({type, message}: AlertParams) => void) => {
        return login({username, password}).then((response)=>{
            setToken(response.data);
            callback({
                type: 'success',
                message: 'login success',
            });
        }).catch(() => {
            callback({
                type: 'error',
                message: 'login failed',
            });
        });
    };

    const signout = () => {
        setToken(null);
        setUser(null);
    };

    const value = {token, user, signin, signout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


/**
  * Require auth hoc
  * @return {ReactElement} children
  */
function RequireAuth({children}: { children: JSX.Element }) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.token) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return children;
}

export {AuthProvider, RequireAuth};
