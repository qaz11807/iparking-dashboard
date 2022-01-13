import {useContext, createContext} from 'react';
import {AlertParams} from '../componment/MessageAlert';

interface AuthContextType {
    token: string | null
    user: {
        username: string
    } | null
    signin: (
        username: string,
        password: string,
        callback: ({type, message}: AlertParams) => void
    ) => void
    signout: VoidFunction
}

const AuthContext = createContext<AuthContextType>(null!);
/**
 * @return {a} auth context
*/
function useAuth() {
    return useContext(AuthContext);
}

export {AuthContext, useAuth};
