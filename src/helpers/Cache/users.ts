import * as Utils from "./utils.js";
import * as Constants from "../../constants.js";
import { jsonObject, DiscordUserInfo, Snowflake, TypeObject } from "../../types.js";

const file: string = Constants.cacheUsersFile;

Utils.touchIf(file, JSON.stringify({
  lastUpdate: 0,
  users: {},
}, undefined, 2))

export interface UserCache extends DiscordUserInfo {
  lastUpdate: number;
}

export interface UsersCache extends jsonObject {
  lastUpdate: number;
  users: TypeObject<UserCache>;
}

export function save(json: UsersCache) {
  Utils.writeFile(
    file,
    process.env.NODE_ENV === "production"
      ? JSON.stringify(json)
      : JSON.stringify(json, undefined, 2)
  );
}

export function read(): UsersCache {
  const json = Utils.readFile(file);
  return JSON.parse(json)
}

export function set(...users: UserCache[]): UsersCache {
  const oldJson: UsersCache = read();
  const newJson: UsersCache = {
    lastUpdate: Date.now(),
    users: {
      ...oldJson.users, 
      ...(users.reduce<TypeObject<UserCache>>((c, v) => {
        c[v.id] = v;
        return c;
      }, {}))
    },
  };

  save(newJson);

  return newJson;
}

export function getByID(id: Snowflake): UserCache {
  return (
    read().users[id] || null
  );
}

export function getByUsername(username: string): UserCache {
  for (const id in read().users) {
    if (Object.prototype.hasOwnProperty.call(read().users, id)) {
      const element = read().users[id];
      if(element.username === username)
        return element
    }
  }
}
