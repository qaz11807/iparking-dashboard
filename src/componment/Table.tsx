import React from 'react';
import {useState, useCallback, useEffect} from 'react';
import EditIcon from '../images/editing.png';
import {updatedArray} from '../utils/busy';
import {datePrettyPrint} from '../utils/date-helper';
import {CRUDRepository, PagenationOptions} from '../utils/repository';
import AddButton from './AddButton';
import {Form, onSubmitProps} from './Form/FormTemplate';
import {FormType} from './Form/Forms';
import Modal from './Modal';
import Pagination from './Pagination';
import {AlertParams, StatusAlert} from './MessageAlert';

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

interface Props<T>{
    keysExtractor: string[];
    repo: CRUDRepository<T>;
    formType: FormType
    initData: T
    pageSize?: number
}

/**
 * @param {T} datas response datas
 * @return {ReactElement}
 */
export default function Table<T>(
    {
        keysExtractor,
        formType,
        repo,
        initData,
        pageSize = 6,
    }: Props<T>,
) {
    const [datas, setDatas] = useState<T[]>([]);
    const [selected, setSelected] = useState<T>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [counts, setCounts] = useState<number>(0);
    const [alert, setAlert] = useState<AlertParams>();

    useEffect(() => {
        queryData({
            pageSize: pageSize,
        });
    }, []);

    useEffect(() => {
        if (alert) {
            setTimeout(()=>setAlert(undefined), 5000);
        }
    }, [alert]);

    const onClickEdit = useCallback((data)=>{
        setSelected(data);
        setIsOpen(true);
    }, []);

    const updateCount = async ()=>{
        const dataCounts = await repo.getCount();
        setCounts(dataCounts);
    };

    const queryData = async (option?: PagenationOptions)=>{
        setDatas([]);
        setLoading(true);
        updateCount();
        const reQueriedData = await repo.getAll(option);
        setDatas(reQueriedData);
        setLoading(false);
    };

    const submitStrageties = {
        'create': async (alterData: T, callback? : VoidFunction ) => {
            await repo.create(alterData);
            if (callback) {
                callback();
            }
            setIsOpen(false);
            queryData({
                pageSize: pageSize,
            });
        },
        'update': async (alterData: T, dataId: number, callback?: VoidFunction) => {
            await repo.update(dataId, alterData);
            if (callback) {
                callback();
            }
            setIsOpen(false);
            setDatas(updatedArray<T>(datas, 'id' as keyof T, alterData));
        },
        'delete': async (dataId: number, callback?: VoidFunction) => {
            await repo.delete(dataId);
            if (callback) {
                callback();
            }
            setIsOpen(false);
            queryData({
                pageSize: pageSize,
            });
        },
    };

    const onSubmit = async ({type, alterData, dataId, callback}: onSubmitProps<T>)=>{
        try {
            switch (type) {
            case 'create':
                await submitStrageties['create'](alterData!, callback);
                setAlert({
                    type: 'success',
                    message: 'Success Created Data!',
                });
                break;
            case 'update':
                await submitStrageties['update'](alterData!, dataId!, callback);
                setAlert({
                    type: 'success',
                    message: 'Success Updated Data!',
                });
                break;
            case 'delete':
                await submitStrageties['delete'](dataId!, callback);
                setAlert({
                    type: 'success',
                    message: 'Success Delete Data!',
                });
                break;
            default:
                setIsOpen(false);
                break;
            }
        } catch (error) {
            console.log(error);
            setIsOpen(false);
            if (callback) {
                callback();
            }
            if (error instanceof Error && error.message) {
                setAlert({
                    type: 'error',
                    message: error.message,
                });
            }
        }
    };

    const renderTHead = keysExtractor.map((key, index)=>{
        return (
            <th key={index}>{key}</th>
        );
    });

    /**
     * @param {T} value
     * @param {string} key
     * @param {boolean} isHead
     * @return {any}
     */
    function renderTRows<T>(value: T, key: string, isHead = false): any {
        if ( value instanceof Date) {
            return (
                <td key={key}>{datePrettyPrint(value)}</td>
            );
        }
        if ( value && typeof value === 'object' ) {
            return Object.values(value).map((nestVal, index) => renderTRows(nestVal, `nest_${index}_${key}`));
        }
        return (
            isHead === true ?
                <th key={key}>{value}</th> :
                <td key={key}>{value instanceof Date ? datePrettyPrint(value) : value}</td>
        );
    }

    const renderEditRow = (data: T) => {
        return (
            <td>
                <div className='flex justify-center' onClick={()=>{
                    onClickEdit(data);
                }}>
                    <img className="h-6 w-6 hover:cursor-pointer" src={EditIcon} alt="EditIcon"/>
                </div>
            </td>
        );
    };

    const renderTBody = datas.map((data: T, index)=> {
        const rows = Object.values(data).map((value, index)=>renderTRows(value, `${index}`, index === 0)).flat();
        return (
            <tr key={index} className='hover'>
                {rows}
                {renderEditRow(data)}
            </tr>
        );
    });

    const emptyTBody = Array.from(
        {length: pageSize - datas.length},
        (v, i) => {
            return <tr key={`empty_${i}`} className={`opacity-0`}><th>{1}</th></tr>;
        });

    return (
        <div className="overflow-x-auto w-full px-32">
            <div className='flex items-end'>
                <div className='basis-3/4'>
                    <TableStats counts={counts}/>
                </div>
                <div className='basis-1/4 flex justify-end'>
                    <AddButton onClick={()=>{
                        setSelected(undefined);
                        setIsOpen(true);
                    }}/>
                </div>
            </div>
            <Modal.Toggle isOpen={isOpen}/>
            <Modal.Box>
                <Form data={selected} formType={formType} initData={initData} onSubmit={onSubmit}/>
            </Modal.Box>
            <div className='indicator w-full'>
                {isLoading && <div className="indicator-item indicator-middle indicator-center w-12 h-12 loader"/>}
                <table className="table w-full border-2 text-center">
                    <thead>
                        <tr>
                            {renderTHead}
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading}
                        {renderTBody.concat(emptyTBody)}
                    </tbody>
                </table>
            </div>
            <Pagination
                totalPages={Math.ceil(counts/pageSize)}
                onChangePage={(page)=>{
                    queryData({
                        page: page,
                        pageSize: pageSize,
                    });
                }}
            ></Pagination>
            { alert && <StatusAlert type={alert?.type} message={alert?.message}/>}
        </div>
    );
}
