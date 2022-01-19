import React from 'react';
import DataTableProvider from '../provider/DataTableProvider';
import {DataTableConfig} from '../features/service/serviceSlice';
import {Order, Status} from '../models/order';

/**
 * the page that related order operation
 * @return {ReactElement}
 */
export default function OrderPage() {
    const initialState: DataTableConfig<Order> = {
        type: 'order',
        defaultData: {
            id: 0,
            enterTime: new Date(),
            exitTime: null,
            status: Status.pending,
            tradeAmount: null,
        },
        keysExtractor: [
            '#',
            'Enter Time',
            'Exit Time',
            'Status',
            'Trade Amount',
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

