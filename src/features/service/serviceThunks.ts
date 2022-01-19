import {createAsyncThunk} from '@reduxjs/toolkit';
import {repoSelector} from '../../api/service';
import {RootState} from '../../store';
import {pushMessage} from '../message/messageSlice';

export const getCount = createAsyncThunk(
    'service/getCount',
    async (_, {getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            const repo = repoSelector(state.dataTable!.type);
            const count = await repo.getCount();
            return count;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const getAll = createAsyncThunk(
    'service/getAll',
    async (_, {dispatch, getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            const repo = repoSelector(state.dataTable!.type);
            const datas = await repo.getAll(state.dataTable!.pagination);
            dispatch(pushMessage({status: 'success', message: 'Success Get All Data!'}));
            return datas;
        } catch (error) {
            dispatch(pushMessage({status: 'error', message: 'Failed to Get All Data!'}));
            return rejectWithValue(error);
        }
    },
);

export const updateData = createAsyncThunk(
    'serive/update',
    async ({updatedData} : {updatedData: any}, {dispatch, getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            const repo = repoSelector(state.dataTable!.type);
            await repo.update(updatedData.id, updatedData);
            dispatch(pushMessage({status: 'success', message: 'Success Update Data!'}));
            dispatch(getCount());
            dispatch(getAll());
        } catch (error) {
            dispatch(pushMessage({status: 'error', message: error as string}));
            return rejectWithValue(error);
        }
    },
);

export const createData = createAsyncThunk(
    'serive/create',
    async ({createdData} : {createdData: any}, {dispatch, getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            const repo = repoSelector(state.dataTable!.type);
            await repo.create(createdData);
            dispatch(pushMessage({status: 'success', message: 'Success Create Data!'}));
            dispatch(getCount());
            dispatch(getAll());
        } catch (error) {
            dispatch(pushMessage({status: 'error', message: error as string}));
            return rejectWithValue(error);
        }
    },
);

export const deleteData = createAsyncThunk(
    'serive/delete',
    async ({dataId} : {dataId: number}, {dispatch, getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            const repo = repoSelector(state.dataTable!.type);
            await repo.delete(dataId);
            dispatch(pushMessage({status: 'success', message: 'Success Create Data!'}));
            dispatch(getCount());
            dispatch(getAll());
        } catch (error) {
            dispatch(pushMessage({status: 'error', message: error as string}));
            return rejectWithValue(error);
        }
    },
);
