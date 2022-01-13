export interface Plate {
    id: number;
    license: string;
    User?: {
        username: string;
    } | null;
}
