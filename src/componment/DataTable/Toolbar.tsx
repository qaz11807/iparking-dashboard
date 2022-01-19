import React from 'react';
import {useEffect} from 'react';
import AddButton from './AddButton';
import {getCount} from '../../features/service/serviceThunks';
import {actions} from '../../provider/DataTableProvider';
import {useAppDispatch, useAppSelector} from '../../hook/useApp';

/**
 * @param {number} counts data counts.
 * @return {ReactElement}
 */
function TableStats({counts}: {counts: number}) {
    return (
        <div className="shadow stats">
            <div className="stat">
                <div className="stat-title">Total Datas</div>
                <div className="stat-value flex justify-center">{counts}</div>
                <div className="stat-desc"></div>
            </div>
        </div>
    );
};

/**
 * @param {T} datas response datas
 * @return {ReactElement}
 */
export default function Toolbar() {
    const count = useAppSelector((state) => state.dataTable!.count);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getCount());
    }, []);

    return (
        <div className='flex items-end'>
            <div className='basis-3/4'>
                <TableStats counts={count}/>
            </div>
            <div className='basis-1/4 flex justify-end'>
                <AddButton onClick={()=>{
                    dispatch(actions.setSelected(null));
                    dispatch(actions.openModal(true));
                }}/>
            </div>
        </div>
    );
}
