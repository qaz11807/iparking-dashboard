import React from 'react';

/**
 * @param {Props} props
 * @return {ReactElement}
 */
export function List({children}: {children: React.ReactNode}) {
    return (
        <ul className="container steps">
            {children}
        </ul>
    );
}


interface NodeProps {
    label: string
    step: number
    currentStep: number
    isLast?: boolean
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
export function Node({label, step, currentStep, isLast}: NodeProps) {
    let icon;
    if (isLast) {
        icon = (currentStep === step) ? '✓' : '?';
    } else {
        icon = (currentStep > step) ? '✓' : '?';
    }
    return (
        <li data-content={icon} className={`step ${(currentStep >= step) ? 'step-primary' : ''}`}>{label}</li>
    );
}

export default {List, Node};
