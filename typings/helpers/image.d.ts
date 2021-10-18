/// <reference types="node" />
import { Snowflake } from "../types.js";
export declare function fetchImg(id: Snowflake, size: number): Promise<Buffer | null>;
