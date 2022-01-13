import React, {Fragment} from 'react';
import {Order, Status} from '../../models/order';
import {Plate} from '../../models/plate';
import {Role, User} from '../../models/user';
import {InputDisable, InputOption, InputText, InputDatePicker} from './FormInputs';

interface FormDetailProps<T> {
    data: T,
    updateValue: (field: Partial<T>)=>void,
    isCreate: boolean
}

/**
 * @param {FormDetailProps} formDetailProps
 * @return {ReactElement}
 */
function OrderForm({data, updateValue, isCreate}: FormDetailProps<Order>) {
    return (
        <Fragment>
            {
                !isCreate &&
                <InputDisable
                    label='Id'
                    value={data.id}
                />
            }
            <div className='flex'>
                <div className="flex-1">
                    <InputDatePicker
                        label='Enter Time'
                        value={data.enterTime}
                        onChange={(date) => updateValue({enterTime: date})}
                    />
                </div>

                <div className="flex-1">
                    <InputDatePicker
                        label='Exit Time'
                        value={data.exitTime ? data.exitTime : undefined}
                        onChange={(date) => updateValue({exitTime: date})}
                    />
                </div>
            </div>

            <div className='flex'>
                <InputOption
                    enumType={Status}
                    label='Status'
                    value={data.status}
                    onChange={(e)=>{
                        const val = e.target.value as Status;
                        updateValue({status: val});
                    }}
                />

                <InputText
                    type='number'
                    label='Trade Amount'
                    placeholder='tradeAmount'
                    value={data.tradeAmount ? data.tradeAmount : 0}
                    onChange={(e)=>{
                        const val = parseInt(e.target.value);
                        updateValue({tradeAmount: val ? val : undefined});
                    }}
                />
            </div>

            <div className='flex'>
                <InputText
                    label='Plate License'
                    placeholder='license'
                    value={data.Plate ? data.Plate.license: ''}
                    onChange={(e)=>{
                        if (e.target.value.trim() !== '') {
                            updateValue({Plate: {license: e.target.value}});
                        }
                    }}
                />
            </div>
        </Fragment>
    );
}

/**
 * @param {FormDetailProps} formDetailProps
 * @return {ReactElement}
 */
function PlateForm({data, updateValue, isCreate}: FormDetailProps<Plate>) {
    return (
        <Fragment>
            {
                !isCreate &&
                <InputDisable
                    label='Id'
                    value={data.id}
                />
            }
            <div className='flex'>
                <InputText
                    label='License'
                    placeholder='license'
                    value={data.license}
                    onChange={(e)=>{
                        updateValue({license: e.target.value});
                    }}
                />
            </div>
            <div className='flex'>
                <InputText
                    label='Username'
                    placeholder='username'
                    value={data.User ? data.User.username: ''}
                    onChange={(e)=>{
                        if (e.target.value.trim() !== '') {
                            updateValue({User: {username: e.target.value}});
                        }
                    }}
                />
            </div>
        </Fragment>
    );
}


/**
 * @param {FormDetailProps} formDetailProps
 * @return {ReactElement}
 */
function UserForm({data, updateValue, isCreate}: FormDetailProps<User>) {
    return (
        <Fragment>
            {
                !isCreate &&
                <InputDisable
                    label='Id'
                    value={data.id}
                />
            }
            <div className='flex'>
                <InputText
                    label='username'
                    placeholder='username'
                    disable={!isCreate}
                    value={data.username}
                    onChange={(e)=>{
                        if (e.target.value.trim() !== '') {
                            updateValue({username: e.target.value});
                        }
                    }}
                />
                {
                    isCreate &&
                    <InputText
                        type='password'
                        label='password'
                        placeholder='password'
                        disable={!isCreate}
                        value={data.password ? data.password: ''}
                        onChange={(e)=>{
                            if (e.target.value.trim() !== '') {
                                updateValue({password: e.target.value});
                            }
                        }}
                    />
                }
            </div>
            <InputOption
                enumType={Role}
                label='Role'
                value={data.role}
                onChange={(e)=>{
                    const val = e.target.value as Role;
                    updateValue({role: val});
                }}
            />
        </Fragment>
    );
}

export type FormType = 'order' | 'plate' | 'user';
export default {OrderForm, PlateForm, UserForm};
