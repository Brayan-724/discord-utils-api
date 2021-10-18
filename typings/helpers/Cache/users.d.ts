import { jsonObject, DiscordUserInfo, Snowflake, TypeObject } from "../../types.js";
export interface UserCache extends DiscordUserInfo {
    lastUpdate: number;
}
export interface UsersCache extends jsonObject {
    lastUpdate: number;
    users: TypeObject<UserCache>;
}
export declare function save(json: UsersCache): void;
export declare function read(): UsersCache;
export declare function set(...users: UserCache[]): UsersCache;
export declare function getByID(id: Snowflake): UserCache;
export declare function getByUsername(username: string): UserCache;
