import classNames from 'classnames';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hook/useApp';
import {Order} from '../../models/order';
import {Plate} from '../../models/plate';
import {User} from '../../models/user';
import {actions} from '../../provider/DataTableProvider';
import Forms, {FormType} from './Forms';
import {createData, updateData, deleteData} from '../../features/service/serviceThunks';
/**
 * @return {ReactElement} caption here
 */
export function Form() {
    const type = useAppSelector((state) => state.dataTable!.type);
    const selected = useAppSelector((state) => state.dataTable!.selected);
    const unsavedData = useAppSelector((state) => state.dataTable!.unsavedData);
    const isUpdating = useAppSelector((state) => state.dataTable!.flags.isUpdating);
    const isDeleting = useAppSelector((state) => state.dataTable!.flags.isDeleting);
    const isAlter = useAppSelector((state) => state.dataTable!.flags.isAlter);

    const dispatch = useAppDispatch();

    const saveBtnClass = classNames(
        'btn',
        {
            'loading': isUpdating,
            'btn-primary': isAlter,
            'btn-disabled': !isAlter,
        },
    );

    const delBtnClass = classNames(
        'btn',
        {
            'loading': isDeleting,
            'btn-warning': selected ? true : false,
            'btn-disabled': selected ? false : true,
        },
    );

    const onClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!selected) {
            await dispatch(createData({createdData: unsavedData}));
        } else {
            if (isAlter) {
                await dispatch(updateData({updatedData: unsavedData}));
            }
        }
    };

    const onDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        await dispatch(deleteData({dataId: selected.id}));
    };

    const onCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(actions.openModal(false));
    };

    /**
     * @param {Partial} field updated field.
     */
    function updateValue<T>(field: Partial<T>) {
        dispatch(actions.setUnsavedData(field));
    };

    const renderForm = (type: FormType)=>{
        switch (type) {
        case 'order':
            return (
                <Forms.OrderForm
                    isCreate={!selected}
                    data={unsavedData as any as Order}
                    updateValue={updateValue}
                />
            );
        case 'plate':
            return (
                <Forms.PlateForm
                    isCreate={!selected}
                    data={unsavedData as any as Plate}
                    updateValue={updateValue}
                />
            );
        case 'user':
            return (
                <Forms.UserForm
                    isCreate={!selected}
                    data={unsavedData as any as User}
                    updateValue={updateValue}
                />
            );
        }
    };

    return (
        <form>
            {renderForm(type as FormType)}
            <div className="modal-action">
                <button className={saveBtnClass} onClick={onClick}>Save</button>
                <button className={delBtnClass}
                    onClick={onDelete}>Delete</button>
                <button className="btn btn-outline" onClick={onCancel}>Close</button>
            </div>
        </form>
    );
}
