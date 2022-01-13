import React from 'react';
import {UserRepo} from '../api/service';
import Table from '../componment/Table';
import {Role, User} from '../models/user';

/**
 * the page that related order operation
 * @return {ReactElement}
 */
export default function UserPage() {
    const init: User = {
        id: 0,
        username: '',
        password: undefined,
        role: Role.user,
    };

    return (
        <Table
            keysExtractor={[
                '#',
                'Username',
                'Role',
            ]}
            formType={'user'}
            initData={init}
            repo={UserRepo}
        />
    );
}
