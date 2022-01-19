import classNames from 'classnames';
import React from 'react';

export interface AlertParams{
    type?: string;
    message?: string;
}

/**
  * alert.
  * @param {AlertParams} alert icon type and alert message
  * @return {ReactElement} caption here
  */
function Message({type='success', message=''}: AlertParams) {
    const msgStyled = classNames(
        'rounded-lg',
        'w-60', 'h-32',
        'm-4', 'p-4', {
            'bg-emerald-500': type ==='success',
            'bg-rose-600': type ==='error',
        },
    );
    return (
        <div className={msgStyled}>
            <p className='text-2xl text-white'>{type.toUpperCase()}</p>
            <p className='text-lg'>{message}</p>
        </div>
    );
}

/**
  * alert.
  * @param {AlertParams} alert icon type and alert message
  * @return {ReactElement} caption here
  */
export function MessageQueue({messages}: {messages: {status: 'success' | 'error', message: string}[]}) {
    const msgQStyled = classNames(
        'absolute',
        'right-0',
        'bottom-0',
        'flex',
        'flex-col-reverse',
    );
    const renderMsg = messages.map((msg, index)=>{
        return (
            <Message key={index} type={msg.status} message={msg.message}/>
        );
    });
    return (
        <div className={msgQStyled}>
            {renderMsg}
        </div>
    );
}
