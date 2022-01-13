import {isEqual} from 'lodash';
import {safeCreateDate} from './date-helper';

/**
 * @param {any} d1 val1
 * @param {any} d2 val2
 * @return {boolean} is different
 */
export function isDifferent(d1: any, d2: any) {
    return !isEqual(d1, d2);
}
/**
 * updated target object in array.
 * @param {T[]} source
 * @param {string} key
 * @param {T} target
 * @return {T[]}
 */
export function updatedArray<T>(source: T[], key: keyof T, target: T) {
    const updatedArr = source.map((data: T)=>{
        return data[key] === target[key] ? {...data, ...target} : data;
    });
    return updatedArr;
}

export function transformType(data: string): string | Date;
export function transformType<T>(data: T): T;
/**
 * @param {T} data
 * @return {(T|string|Date)}
 */
export function transformType<T>(data: T | string ) : T | string | Date {
    if (typeof data === 'string') {
        return safeCreateDate(data);
    } else {
        return data;
    }
}

export function parseObject<T extends {[key: string]: any}>(data: T[]): T[]
/**
 * @param {T} data
 * @return {T}
 */
export function parseObject<T>(data: T) {
    if (typeof data !== 'object') {
        return transformType(data);
    }
    if (Array.isArray(data)) {
        return data.map((cell)=>parseObject(cell));
    } else {
        const transformed = {};
        Object.entries(data).forEach(([key, value])=>{
            Object.assign(transformed, {
                [key]: transformType(value),
            });
        });
        return transformed;
    }
};
