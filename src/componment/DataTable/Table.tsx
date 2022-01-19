import React from 'react';
import {useCallback} from 'react';
import EditIcon from '../../images/editing.png';
import {datePrettyPrint} from '../../utils/date-helper';
import {useAppDispatch, useAppSelector} from '../../hook/useApp';
import {actions} from '../../provider/DataTableProvider';

/**
 * @return {ReactElement}
 */
function THead({children}: {children: React.ReactNode}) {
    return (
        <th>{children}</th>
    );
}

/**
 * @return {ReactElement}
 */
function TData({children}: {children: React.ReactNode}) {
    return (
        <td>{children}</td>
    );
}

/**
 * @return {ReactElement}
 */
export default function Table() {
    const keysExtractor = useAppSelector((state) => state.dataTable!.keysExtractor);
    const datas = useAppSelector((state) => state.dataTable!.datas);
    const pageSize = useAppSelector((state) => state.dataTable!.pagination.pageSize);
    const isFetching = useAppSelector((state) => state.dataTable!.flags.isFetching);
    const dispatch = useAppDispatch();

    const onClickEdit = useCallback((data)=>{
        dispatch(actions.setSelected(data));
        dispatch(actions.openModal(true));
    }, []);

    const renderTHead = keysExtractor.map((header, key)=>{
        return (
            <THead key={key}>{header}</THead>
        );
    });

    const renderTRows = (value: any, key: string, isHead = false): any => {
        if ( value instanceof Date) {
            return (
                <TData key={key}>{datePrettyPrint(value)}</TData>
            );
        }
        if ( value && typeof value === 'object' ) {
            return Object.values(value).map((nestVal, index) => renderTRows(nestVal, `nest_${index}_${key}`));
        }
        return (
            isHead === true ?
                <THead key={key}>{value}</THead>:
                <TData key={key}>{value instanceof Date ? datePrettyPrint(value) : value}</TData>
        );
    };

    const renderTBody = datas.map((data: any, index)=> {
        const rows = Object.values(data).map((value, index)=>renderTRows(value, `${index}`, index === 0)).flat();
        const renderEditRow = (data: any) => {
            return (
                <TData>
                    <div className='flex justify-center' onClick={()=>{
                        onClickEdit(data);
                    }}>
                        <img className="h-6 w-6 hover:cursor-pointer" src={EditIcon} alt="EditIcon"/>
                    </div>
                </TData>
            );
        };
        return (
            <tr key={index} className='hover'>
                {rows}
                {renderEditRow(data)}
            </tr>
        );
    });

    const emptyTBody = Array.from(
        {length: pageSize! - datas.length},
        (v, i) => {
            return <tr key={`empty_${i}`} className={`opacity-0`}><th>{1}</th></tr>;
        },
    );

    return (
        <div className='indicator w-full'>
            {isFetching && <div className="indicator-item indicator-middle indicator-center w-12 h-12 loader"/>}
            <table className="table w-full border-2 text-center">
                <thead>
                    <tr>
                        {renderTHead}
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {isFetching}
                    {renderTBody.concat(emptyTBody)}
                </tbody>
            </table>
        </div>
    );
}
