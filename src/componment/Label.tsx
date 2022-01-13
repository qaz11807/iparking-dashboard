import React from 'react';
interface LabelProps<T> {
    label: string
    value: T
}
/**
 * the page that related  operation
 * @param {LabelProps} labelProps
 * @return {ReactElement}
 */
export function Label<T>({label, value}: LabelProps<T>) {
    return (
        <label className="label">
            <span className="label-text">{label}</span>
            <span className="mx-2 p-2 border border-pink-400 rounded-md">{value}</span>
        </label>
    );
}
