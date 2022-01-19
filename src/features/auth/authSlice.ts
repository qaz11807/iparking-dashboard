import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/user';
import {login} from '../../api/auth';
import {UserRepo} from '../../api/service';
import {pushMessage} from '../message/messageSlice';

interface LoginPayload {
    username: string
    password: string
}

export const signIn = createAsyncThunk(
    'auth/signin',
    async ({username, password} : LoginPayload, {dispatch, rejectWithValue}) => {
        try {
            const response = await login(username, password);
            dispatch(pushMessage({status: 'success', message: 'Success login!'}));
            return response.data;
        } catch (error) {
            dispatch(pushMessage({status: 'error', message: 'Login Failed!'}));
            return rejectWithValue(error);
        }
    },
);

export const getUserInfo = createAsyncThunk(
    'auth/getuser',
    async (_, {rejectWithValue}) => {
        try {
            const response = await UserRepo.getAxios().get('/my');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

interface AuthState{
    user: User | null
    token: string | null
    isFetching: boolean
}

const initialState: AuthState = {
    user: null,
    token: null,
    isFetching: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateToken: (state, action: PayloadAction<string | null>)=>{
            state.token = action.payload;
        },
        updateUser: (state, action: PayloadAction<User | null>)=>{
            state.user = action.payload;
        },
        signout: (state) => {
            state.user = null;
            state.token = null;
            state.isFetching = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, pending);
        builder.addCase(signIn.fulfilled, fulfilled('token'));
        builder.addCase(signIn.rejected, rejected);

        builder.addCase(getUserInfo.pending, pending);
        builder.addCase(getUserInfo.fulfilled, fulfilled('user'));
        builder.addCase(getUserInfo.rejected, rejected);
    },
});

const pending = (state: AuthState) => {
    state.isFetching = true;
};

const rejected = (state: AuthState) => {
    state.isFetching = false;
};

const fulfilled = <T extends keyof AuthState, U extends AuthState[T]>(key: T) => (state: AuthState, action: PayloadAction<U>) => {
    state.isFetching = false;
    state[key] = action.payload;
};

export const {updateUser, updateToken, signout} = authSlice.actions;
export default authSlice.reducer;


