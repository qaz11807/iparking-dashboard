import React from 'react';
import {DataTableConfig} from '../features/service/serviceSlice';
import {Plate} from '../models/plate';
import DataTableProvider from '../provider/DataTableProvider';
// import Table from '../componment/Table';
// import {Plate} from '../models/plate';

/**
 * the page that related order operation
 * @return {ReactElement}
 */
export default function PlatePage() {
    const initialState: DataTableConfig<Plate> = {
        type: 'plate',
        defaultData: {
            id: 0,
            license: '',
        },
        keysExtractor: [
            '#',
            'License',
            'Username',
        ],
    };

    return (
        <DataTableProvider
            initialState={initialState}
        />
    );
}
