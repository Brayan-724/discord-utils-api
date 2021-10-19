/// <reference types="node" />
export declare function resolvePath(path: string): string;
export declare function exists(path: string): boolean;
export declare function getPath(path: string): string;
export declare function createIf(path: string, _default?: string | Buffer): void;
export declare function touchIf(_path: string, _default: string | Buffer): void;
export declare function mkdirIf(_path: string): void;
export declare function readDir(dir: string): string[];
export declare function readFile(file: string): string;
export declare function readFileBuffer(file: string): Buffer;
export declare function writeFile(file: string, data: string | Buffer): void;
