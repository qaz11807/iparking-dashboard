import React from 'react';
import {DataTableConfig} from '../features/service/serviceSlice';
import {Role, User} from '../models/user';
import DataTableProvider from '../provider/DataTableProvider';
// import Table from '../componment/Table';
// import {Role, User} from '../models/user';

/**
 * the page that related order operation
 * @return {ReactElement}
 */
export default function UserPage() {
    const initialState: DataTableConfig<User> = {
        type: 'user',
        defaultData: {
            id: 0,
            username: '',
            password: undefined,
            role: Role.user,
        },
        keysExtractor: [
            '#',
            'Username',
            'Role',
        ],
    };

    return (
        <DataTableProvider
            initialState={initialState}
        />
    );
}
