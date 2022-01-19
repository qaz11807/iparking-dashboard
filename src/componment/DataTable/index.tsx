import React from 'react';
import {useEffect} from 'react';
import Table from './Table';
import Toolbar from './Toolbar';
import Pager from './Pager';
import {useAppDispatch, useAppSelector} from '../../hook/useApp';
import {getAll} from '../../features/service/serviceThunks';
import Modal from '../Modal';
import {Form} from '../Form/FormTemplate';
// import {Form} from '../Form/FormTemplate';
/**
 * @return {ReactElement}
 */
export default function DataTable() {
    const page = useAppSelector((state) => state.dataTable!.pagination.page)!;
    const isModalOpen = useAppSelector((state) => state.dataTable!.flags.isModalOpen);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAll());
    }, [page]);

    return (
        <div className="overflow-x-auto w-full px-32">
            <Toolbar/>
            <Table/>
            <Pager/>
            <Modal.Toggle isOpen={isModalOpen}/>
            <Modal.Box>
                <Form />
            </Modal.Box>
        </div>
    );
}
