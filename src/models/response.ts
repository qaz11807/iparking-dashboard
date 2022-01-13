
export enum ResponseStatus{
    Success = 'Success',
    Failed = 'Failed'
}

export interface ResponseFormat {
    status: ResponseStatus;
    data?: any;
    error?: string;
}
