import React from 'react';
import {PlateRepo} from '../api/service';
import Table from '../componment/Table';
import {Plate} from '../models/plate';

/**
 * the page that related order operation
 * @return {ReactElement}
 */
export default function PlatePage() {
    const init: Plate = {
        id: 0,
        license: '',
    };

    return (
        <Table
            keysExtractor={[
                '#',
                'License',
                'Username',
            ]}
            formType={'plate'}
            initData={init}
            repo={PlateRepo}
        />
    );
}
