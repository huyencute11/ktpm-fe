export interface BaseInterfaceRespone<T> {
    data: T;
    status: number;
    message: string;
}
export interface BaseDataRespone<T> {
    data?: T;
    result?: number;
    message?: string;
}