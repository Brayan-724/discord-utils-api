import type { Response as FetchResponse } from "node-fetch"
import Fetch from "../helpers/fetch.js"
import { Snowflake, DiscordUserInfo } from "../types.js"
import * as Cache from "./cache.js"
import * as Constants from "../constants.js"

export async function fetchUser(id: Snowflake): Promise<DiscordUserInfo | null> {
  const userInfo: Cache.Users.UserCache | null = Cache.Users.getByID(id);
  if(userInfo !== null && Date.now() - userInfo.lastUpdate <= Constants.UsersCacheTime) {
    return userInfo;
  }

  const response: FetchResponse = await Fetch(`https://discord.com/api/v9/users/${id}`, {
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`
    }
  });
  
  if (!response.ok) 
    if(userInfo !== null) return userInfo;
    else return null;
  
  const user: DiscordUserInfo = <DiscordUserInfo>(await response.json());

  Cache.Users.set({
    ...user,
    lastUpdate: Date.now()
  });

  return user;
}