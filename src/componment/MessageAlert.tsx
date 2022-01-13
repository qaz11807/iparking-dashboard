import classNames from 'classnames';
import React from 'react';

/**
  * Success Icon.
  * @return {ReactElement} caption here
  */
function SuccessIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            ></path>
        </svg>
    );
};

/**
  * Error Icon.
  * @return {ReactElement} caption here
  */
function ErrorIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-6 mx-2 stroke-current">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            ></path>
        </svg>
    );
};

const icons = {
    'success': <SuccessIcon/>,
    'error': <ErrorIcon/>,
};

export interface AlertParams{
    type?: string;
    message?: string;
}

/**
  * alert.
  * @param {AlertParams} alert icon type and alert message
  * @return {ReactElement} caption here
  */
export function MessageAlert({type='success', message=''}: AlertParams) {
    const windowStyled = classNames(
        'alert',
        `alert-${type}`,
        'h-8',
        'm-2',
        'text-white',
        {
            'bg-emerald-500': type ==='success',
            'bg-rose-500': type ==='error',
        },
    );
    const key = type as keyof typeof icons;
    return (
        <div className={windowStyled}>
            <div className="flex-1">
                {icons[key]}
                <label >{message}</label>
            </div>
        </div>
    );
}

/**
  * alert.
  * @param {AlertParams} alert icon type and alert message
  * @return {ReactElement} caption here
  */
export function StatusAlert({type='success', message=''}: AlertParams) {
    const windowStyled = classNames(
        'absolute',
        'bottom-0', 'right-0',
        'rounded-lg',
        'w-60', 'h-32',
        'm-2', 'p-4', {
            'bg-emerald-500': type ==='success',
            'bg-rose-600': type ==='error',
        },
    );
    // const key = type as keyof typeof icons;
    return (
        <div className={windowStyled}>
            <p className='text-2xl text-white'>{type.toUpperCase()}</p>
            <p className='text-lg'>{message}</p>
        </div>
    );
}
