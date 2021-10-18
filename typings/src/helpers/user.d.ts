import { Snowflake, DiscordUserInfo } from "../types.js";
export declare function fetchUser(id: Snowflake): Promise<DiscordUserInfo | null>;
