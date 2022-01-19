import {AnyAction, createSlice, Reducer} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/types/types-external';
import {isDifferent} from '../../utils/busy';
import {PaginationOptions} from '../../utils/repository';
import * as Api from './serviceThunks';

export interface DataTableState<T> {
    type: string
    keysExtractor: string[]
    datas: T[]
    selected: T | null
    defaultData: T
    unsavedData: T
    count: number
    pagination: PaginationOptions
    flags: {
        isModalOpen: boolean
        isFetching: boolean
        isDeleting: boolean
        isUpdating: boolean
        isAlter: boolean
        isError: boolean
    }
    errMsg: string | null
}

interface DataTableRequiredConfig<T> extends Partial<DataTableState<T>> {
    type: string
    defaultData: T
    keysExtractor: string[]
}

interface DataTableOptionConfig<T> extends Partial<DataTableState<T>> {
    pagination?: PaginationOptions
}

export type DataTableConfig<T> = DataTableRequiredConfig<T> & DataTableOptionConfig<T>

export type ActionType = ReturnType<typeof produceDataTableSlice>['actions'];
export type ReducerType<T> = Reducer<DataTableState<T>, AnyAction>;

export const produceDataTableSlice = <T>(stateConfig: DataTableConfig<T>) => {
    const initialState: DataTableState<T> = {
        datas: [],
        selected: null,
        unsavedData: stateConfig.defaultData,
        count: 0,
        pagination: {
            page: 1,
            pageSize: 6,
        },
        flags: {
            isModalOpen: false,
            isFetching: false,
            isDeleting: false,
            isUpdating: false,
            isAlter: false,
            isError: false,
        },
        errMsg: null,
        ...stateConfig,
    };
    const serviceSlice = createSlice({
        name: 'dataTable',
        initialState: initialState,
        reducers: {
            setSelected: (state, action) => {
                state.selected = action.payload;
                state.unsavedData = action.payload ? action.payload : state.defaultData;
            },
            setUnsavedData: (state, action) => {
                state.unsavedData = {...state.unsavedData, ...action.payload};
                state.flags.isAlter =
                    state.selected ?
                        isDifferent(state.selected, state.unsavedData) :
                        isDifferent(state.defaultData, state.unsavedData);
            },
            setAlter: (state, action) => {
                state.flags.isAlter = action.payload;
            },
            setPage: (state, action) => {
                state.selected = null;
                state.datas = [];
                state.pagination.page = action.payload;
            },
            openModal: (state, action) => {
                state.flags.isModalOpen = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder.addCase(Api.getCount.fulfilled, (state, action) => {
                state.count = action.payload;
            });

            builder.addCase(Api.getAll.pending, (state) => {
                state.flags.isFetching = true;
                state.datas = [];
            });
            builder.addCase(Api.getAll.fulfilled, (state, action) => {
                state.flags.isFetching = false;
                state.datas = action.payload as any;
            });
            builder.addCase(Api.getAll.rejected, (state) => {
                state.flags.isFetching = false;
                state.datas = [];
            });

            builder.addCase(Api.updateData.pending, onPending('isUpdating'));
            builder.addCase(Api.updateData.fulfilled, onFulfilled('isUpdating'));
            builder.addCase(Api.updateData.rejected, onRejected('isUpdating'));

            builder.addCase(Api.createData.pending, onPending('isUpdating'));
            builder.addCase(Api.createData.fulfilled, onFulfilled('isUpdating'));
            builder.addCase(Api.createData.rejected, onRejected('isUpdating'));

            builder.addCase(Api.deleteData.pending, onPending('isDeleting'));
            builder.addCase(Api.deleteData.fulfilled, onFulfilled('isDeleting'));
            builder.addCase(Api.deleteData.rejected, onRejected('isDeleting'));
        },
    });

    const onPending = (key: keyof Partial<DataTableState<T>['flags']>) => {
        return (state: WritableDraft<DataTableState<T>>) => {
            state.flags[key] = true;
        };
    };

    const onFulfilled = (key: keyof Partial<DataTableState<T>['flags']>) => {
        return (state: WritableDraft<DataTableState<T>>) => {
            state.flags[key] = false;
            state.flags.isModalOpen = false;
        };
    };

    const onRejected = (key: keyof Partial<DataTableState<T>['flags']>) => {
        return (state: WritableDraft<DataTableState<T>>) => {
            state.flags[key] = false;
        };
    };

    return {
        actions: serviceSlice.actions,
        reducer: serviceSlice.reducer,
    };
};

