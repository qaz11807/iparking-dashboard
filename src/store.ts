import {combineReducers, configureStore, Reducer} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import messageReducer from './features/message/messageSlice';
import {DataTableState} from './features/service/serviceSlice';

const staticReducers = {
    auth: authReducer,
    message: messageReducer,
};

const rootReducer = {
    ...staticReducers,
};

export const store = configureStore({
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
    reducer: rootReducer,
});

const asyncReducer: {[key: string]: Reducer} = {};

export const injectReducer = <T>(key: string, reducer: Reducer<T>) => {
    asyncReducer[key] = reducer;
    const newRootReducer = combineReducers({
        ...staticReducers,
        ...asyncReducer,
    });
    store.replaceReducer(newRootReducer);
};

export type RootState = ReturnType<typeof store.getState> & { dataTable?: DataTableState<any>}
export type AppDispatch = typeof store.dispatch
