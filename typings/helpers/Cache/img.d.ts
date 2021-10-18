/// <reference types="node" />
import { jsonObject, Snowflake, TypeObject } from "../../types.js";
export interface ImgData extends jsonObject {
    info: ImgInfo;
    size: number;
    data: Buffer;
}
export interface ImgInfo extends jsonObject {
    id: Snowflake;
    lastUpdate: number;
    paths: {
        [size: number]: string;
    };
}
export interface ImgsCache extends jsonObject {
    lastUpdate: number;
    images: TypeObject<ImgInfo>;
}
export declare function save(json: ImgsCache): void;
export declare function read(): ImgsCache;
export interface ImgSetData {
    id: Snowflake;
    size: number;
    data: Buffer;
}
export declare function set(...images: ImgSetData[]): ImgsCache;
export declare function getByID(id: Snowflake): ImgInfo;
export declare function getImage(id: Snowflake, size: number): Buffer | null;
export declare function resolveImgPath(id: Snowflake, size: number): string;
