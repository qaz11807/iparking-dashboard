import React from 'react';
import {ActionType, produceDataTableSlice, DataTableConfig} from '../features/service/serviceSlice';
import DataTable from '../componment/DataTable';
import {injectReducer} from '../store';

// const middle = (store) => (next) => (action) => {
//     if (store.)
// }

export let actions: ActionType;

interface Props<T>{
    initialState: DataTableConfig<T>
}

/**
 * @return {ReactElement}
 */
export default function DataTableProvider<T>(
    {initialState}: Props<T>,
) {
    const slice = produceDataTableSlice(initialState);
    actions = slice.actions;
    injectReducer('dataTable', slice.reducer);
    return (
        <DataTable />
    );
}
