import React from 'react';
import {OrderRepo} from '../api/service';
import Table from '../componment/Table';
import {Order, Status} from '../models/order';

/**
 * the page that related order operation
 * @return {ReactElement}
 */
export default function OrderPage() {
    const init: Order = {
        id: 0,
        enterTime: new Date(),
        exitTime: null,
        status: Status.pending,
        tradeAmount: null,
    };

    return (
        <Table
            keysExtractor={[
                '#',
                'Enter Time',
                'Exit Time',
                'Status',
                'Trade Amount',
                'License',
                'Username',
            ]}
            formType={'order'}
            initData={init}
            repo={OrderRepo}
        />
    );
}
