import Axios, {AxiosInstance} from 'axios';
import Config from '../config';
import {ResponseFormat, ResponseStatus} from '../models/response';
import {parseObject} from './busy';

export interface PagenationOptions {
    page?: number;
    pageSize?: number;
}

/**
 * the based repository
 */
export class Repository {
    protected axiosInstance: AxiosInstance;
    /**
     * @param {string} prefix url prefix;
     */
    constructor(prefix = '') {
        this.axiosInstance = Axios.create({
            baseURL: Config.serverUrl + prefix,
        });
        this.axiosInstance.interceptors.response.use(
            (response) => {
                const formatted: ResponseFormat = response.data;
                if (formatted.status === ResponseStatus.Success && formatted.data) {
                    formatted.data = parseObject(formatted.data);
                }
                return response;
            },
            (error) => {
                if (error.response) {
                    switch (error.response.status) {
                    case 404:
                        console.log('Page not found!');
                        break;
                    case 500:
                        console.log('Server Internal Error');
                        break;
                    default:
                        console.log(error.message);
                    }
                    if (error.response.data.errors) {
                        error.response.data.errors.forEach((error: Error) => {
                            console.log(error);
                        });
                    } else {
                        console.log(error.response.data);
                    }
                };
                return Promise.reject(error);
            },
        );
    }

    /**
     * get axios instance
     * @return {AxiosInstance}
     */
    getAxios() {
        return this.axiosInstance;
    };

    /**
     * set axios auth token
     * @param {string} token jwt;
     */
    updateToken(token: string | null) {
        if (token) {
            this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        } else {
            delete this.axiosInstance.defaults.headers.common['Authorization'];
        }
    };
}

/**
 * the Repository supply CRUD method.
 */
export class CRUDRepository<T> extends Repository {
    /**
     * @param {number} dataId
     * @return {T}
     */
    async get(dataId: number) {
        try {
            const response = await this.axiosInstance.get(`/${dataId.toString()}`);
            if (response.data.status === ResponseStatus.Failed) {
                throw new Error(response.data.error);
            }
            const data: T = response.data.data;
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * get data counts.
     * @return {number}
     */
    async getCount() {
        try {
            const response = await this.axiosInstance.get(`/count`);
            if (response.data.status === ResponseStatus.Failed) {
                throw new Error(response.data.error);
            }
            const data: number = response.data.data;
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {PagenationOptions} options
     * @return {T[]}
     */
    async getAll(options?: PagenationOptions) {
        try {
            const response = await this.axiosInstance.get('/', {params: options});
            if (response.data.status === ResponseStatus.Failed) {
                throw new Error(response.data.error);
            }
            const datas: T[] = response.data.data;
            return datas;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {T} createdData
     */
    async create(createdData: T) {
        try {
            const response = await this.axiosInstance.post('/', createdData);
            if (response.data.status === ResponseStatus.Failed) {
                throw new Error(response.data.error);
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {number} dataId
     * @param {T} updatedData
     */
    async update(dataId: number, updatedData: T) {
        try {
            const response = await this.axiosInstance.put(`/${dataId.toString()}`, updatedData);
            if (response.data.status === ResponseStatus.Failed) {
                throw new Error(response.data.error);
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {number} dataId
     */
    async delete(dataId: number) {
        try {
            const response = await this.axiosInstance.delete(`/${dataId.toString()}`);
            if (response.data.status === ResponseStatus.Failed) {
                throw new Error(response.data.error);
            }
        } catch (err) {
            throw err;
        }
    }
}


/**
 * the Repository supply Simluate vehicle enter and exit method.
 */
export class SimulateRepository extends Repository {
    /**
     * @param {string} license
     * @return {number}
     */
    async enter(license: string) {
        try {
            const response = await this.axiosInstance.post(`/enter`, {license});
            if (response.data.status === ResponseStatus.Failed) {
                throw new Error(response.data.error);
            }
            return response.data.data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {string} license
     * @return {number}
     */
    async exit(license: string) {
        try {
            const response = await this.axiosInstance.post(`/exit`, {license});
            if (response.data.status === ResponseStatus.Failed) {
                throw new Error(response.data.error);
            }
            return response.data.data;
        } catch (err) {
            throw err;
        }
    }
}

