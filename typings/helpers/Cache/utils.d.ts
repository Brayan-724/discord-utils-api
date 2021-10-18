/// <reference types="node" />
export declare function resolvePath(path: string): string;
export declare function getPath(path: string): string;
export declare function readDir(dir: string): string[];
export declare function readFile(file: string): string;
export declare function readFileBuffer(file: string): Buffer;
export declare function writeFile(file: string, data: string | Buffer): void;
