import {isDate} from 'lodash';

/**
 * @param {unknown} obj object
 * @return {boolean}
 */
export function isValidDate(obj: unknown) {
    const regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
    const dateValidator = new RegExp(regex);
    if (typeof obj === 'string') {
        return dateValidator.test(obj) && obj !== 'Invalid Date';
    } else {
        return isDate(obj) && obj.toString() !== 'Invalid Date';
    }
}

/**
 * @param {string} string
 * @return {boolean}
 */
export function safeCreateDate(string: string) {
    if (isValidDate(string)) {
        return new Date(string);
    } else {
        return string;
    }
}

/**
 * prtint date with YYYY/M/D HH-MM
 * @param {Date} date
 * @return {string}
 */
export function datePrettyPrint(date: Date) {
    return new Intl.DateTimeFormat('zh-tw', {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(date);
};

