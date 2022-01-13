import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface InputOptionProps<T>{
    label: string
    enumType: T
    value: keyof T
    onChange: (e:React.ChangeEvent<HTMLSelectElement>)=>void
}

/**
 * @param {Props} props
 * @return {ReactElement}
 */
export function InputOption<T>({label, enumType, value, onChange}: InputOptionProps<T>) {
    const renderOptions = Object.keys(enumType).map((key, index)=>{
        return <option key={index}>{key}</option>;
    });

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <select className="select select-bordered w-full max-w-xs" value={value as string} onChange={onChange}>
                {renderOptions}
            </select>
        </div>
    );
}

interface InputTextProps {
    type?: 'text' | 'number' | 'password' | 'email'
    label: string;
    placeholder: string;
    value: string | number;
    disable?: boolean;
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void;
}
/**
 * @param {Props} props
 * @return {ReactElement}
 */
export function InputText({type = 'text', label, placeholder, value, disable = false, onChange}: InputTextProps) {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input type={type} placeholder={placeholder}
                className="input input-bordered"
                value={value}
                onChange={onChange}
                disabled={disable}
            />
        </div>
    );
}

interface InputDisableProps {
    label: string,
    value: number
}
/**
 * @param {Props} props
 * @return {ReactElement}
 */
export function InputDisable({label, value}: InputDisableProps) {
    return (
        <div className="form-control">
            <label className="input-group input-group-sm">
                <span>{label}</span>
                <input type="text" value={value} disabled={true} className="input input-bordered input-sm" />
            </label>
        </div>
    );
}

interface InputDatePickerProps {
    label: string
    value?: Date
    onChange: (date: any) => void
}
/**
 * @param {Props} props
 * @return {ReactElement}
 */
export function InputDatePicker({label, value, onChange}: InputDatePickerProps) {
    return (
        <div className="form-control flex-1">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <DatePicker
                className="input input-bordered"
                selected={value? new Date(value) : null}
                onChange={onChange}
                showTimeSelect
                dateFormat="Pp"
            />
        </div>
    );
}


interface InputRadioProps {
    label: string
    value: string
    checked: boolean
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void;
}
/**
 * @param {Props} props
 * @return {ReactElement}
 */
export function InputRadio({label, value, checked, onChange}: InputRadioProps) {
    return (
        <div className="form-control">
            <label className="cursor-pointer label">
                <span className="label-text mx-2">{label}</span>
                <input
                    className="radio radio-sm radio-primary"
                    type="radio"
                    checked={checked}
                    onChange={onChange}
                    value={value}
                />
            </label>
        </div>
    );
}
