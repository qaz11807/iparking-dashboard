import React from 'react';

interface CardProps {
    title: string
    children?: React.ReactNode
    actionLabel: string
    onAction: (e:React.MouseEvent<HTMLButtonElement>)=>void;
}
/**
 * @param {Props} props
 * @return {ReactElement}
 */
export function Card({title, actionLabel, children, onAction}: CardProps) {
    return (
        <div className="card card-bordered w-fit shadow-2xl border-2">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {children}
                <div className="justify-center card-actions">
                    <button className="btn btn-outline btn-primary" onClick={onAction}>{actionLabel}</button>
                </div>
            </div>
        </div>
    );
}
