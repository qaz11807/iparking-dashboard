import Axios, {AxiosInstance} from 'axios';
import {ResponseFormat, ResponseStatus} from '../models/response';
import {parseObject} from './busy';

export interface PaginationOptions {
    page?: number;
    pageSize?: number;
}

/**
 * the based repository
 */
export class Repository {
    protected axiosInstance: AxiosInstance;
    /**
     * @param {string} baseUrl baseUrl;
     * @param {string} prefix route prefix;
     */
    constructor(baseUrl: string, prefix = '') {
        this.axiosInstance = Axios.create({
            baseURL: baseUrl + prefix,
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
                let errMsg;
                if (error.response) {
                    switch (error.response.status) {
                    case 404:
                        errMsg = 'Page not found!';
                        break;
                    case 500:
                        errMsg = 'Server Internal Error!';
                        break;
                    default:
                        errMsg = error.message;
                    }
                    if (error.response.data.errors) {
                        error.response.data.errors.forEach((error: Error) => {
                            console.error(error);
                        });
                    } else {
                        errMsg = error.response.data;
                    }
                };
                return Promise.reject(errMsg);
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
    async getAll(options?: PaginationOptions) {
        try {
            const response = await this.axiosInstance.get(`/`, {params: options});
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
            const response = await this.axiosInstance.post(`/`, createdData);
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

