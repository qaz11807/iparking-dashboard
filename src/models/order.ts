export enum Status {
    pending='pending',
    enter='enter',
    exit='exit',
    done='done'
}

export interface Order {
    id: number;
    enterTime: Date;
    exitTime?: Date | null;
    status: Status;
    tradeAmount: number | null;
    Plate?: {
        license: string;
    } | null;
    User?: {
        username: string;
    } | null;
}
