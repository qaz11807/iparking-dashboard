import classNames from 'classnames';
import React from 'react';
import {useState, useEffect} from 'react';
import {Order} from '../../models/order';
import {Plate} from '../../models/plate';
import {User} from '../../models/user';
import {isDifferent} from '../../utils/busy';
import Forms, {FormType} from './Forms';
export interface onSubmitProps<T> {
    type: 'create' | 'update' | 'delete' | 'cancel'
    alterData?: T
    dataId?: number
    callback?: VoidFunction
}

interface FormProps<T> {
    initData: T
    data?: T
    formType: FormType
    onSubmit: ({type, alterData, dataId, callback}: onSubmitProps<T>)=>void
}
/**
 * @return {ReactElement} caption here
 */
export function Form<T>({data, initData, formType, onSubmit}: FormProps<T>) {
    const [unsavedData, setUnsavedData] = useState<T>(data ? data : initData);
    const [isSaving, setSaving] = useState<boolean>(false);
    const [isDeleting, setDeleting] = useState<boolean>(false);
    const [isAlter, setAlter] = useState<boolean>(false);
    const [isCreate, setCreate] = useState<boolean>(false);

    const saveBtnClass = classNames(
        'btn',
        {
            'loading': isSaving,
            'btn-primary': isAlter,
            'btn-disabled': !isAlter,
        },
    );

    const delBtnClass = classNames(
        'btn',
        {
            'loading': isDeleting,
            'btn-warning': data ? true : false,
            'btn-disabled': data ? false : true,
        },
    );

    useEffect(()=>{
        setCreate(data === undefined);
        setUnsavedData(data ? data : initData);
    }, [data]);

    useEffect(()=>{
        setAlter(data ? isDifferent(data, unsavedData) : isDifferent(initData, unsavedData));
    }, [unsavedData]);

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!data) {
            setSaving(true);
            onSubmit({type: 'create', alterData: unsavedData, callback: ()=>setSaving(false)});
        } else {
            if (isAlter) {
                setSaving(true);
                onSubmit({
                    type: 'update',
                    alterData: unsavedData,
                    dataId: (unsavedData as any).id,
                    callback: ()=>setSaving(false),
                });
            }
        }
    };

    /**
     * @param {Partial} field updated field.
     */
    function updateValue<T>(field: Partial<T>) {
        setUnsavedData({...unsavedData, ...field});
    };

    const renderForm = (type: FormType)=>{
        switch (type) {
        case 'order':
            return (
                <Forms.OrderForm
                    isCreate={isCreate}
                    data={unsavedData as any as Order}
                    updateValue={updateValue}
                />
            );
        case 'plate':
            return (
                <Forms.PlateForm
                    isCreate={isCreate}
                    data={unsavedData as any as Plate}
                    updateValue={updateValue}
                />
            );
        case 'user':
            return (
                <Forms.UserForm
                    isCreate={isCreate}
                    data={unsavedData as any as User}
                    updateValue={updateValue}
                />
            );
        }
    };

    return (
        <form>
            {renderForm(formType)}
            <div className="modal-action">
                <button className={saveBtnClass} onClick={onClick}>Save</button>
                <button className={delBtnClass}
                    onClick={()=>{
                        setDeleting(true);
                        onSubmit({
                            type: 'delete',
                            dataId: (unsavedData as any).id,
                            callback: ()=>setDeleting(false),
                        });
                    }}>Delete</button>
                <button className="btn btn-outline" onClick={()=>onSubmit({type: 'cancel'})}>Close</button>
            </div>
        </form>
    );
}
