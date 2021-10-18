import Express from "express";
export interface ResErrorObject {
    message: string;
    name: string;
}
export interface ResDefOptions {
    status: number;
    data?: any;
    error?: ResErrorObject | null;
}
export default ResDef;
export declare function ResDef(res: Express.Response, options: ResDefOptions): void;
