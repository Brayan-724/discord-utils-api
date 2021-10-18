import Fetch, { Response as FetchResponse } from "node-fetch";
import { Snowflake, DiscordUserInfo } from "../types.js"
import * as Cache from "./cache.js"
import * as Constants from "../constants.js"
import { fetchUser } from "./user.js"

export async function fetchImg(id: Snowflake, size: number): Promise<Buffer | null> {
  const imageInfo: Cache.Img.ImgInfo | null = Cache.Img.getByID(id);
  const image: Buffer | null = Cache.Img.getImage(id, size);
  if(imageInfo !== null && image !== null && Date.now() - imageInfo.lastUpdate <= Constants.UsersCacheTime) {
    return image
  }

  const user: DiscordUserInfo = await fetchUser(id);

  const response: FetchResponse = await Fetch(`https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp?size=${size}`, {
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`
    }
  });
  
  if (!response.ok) 
    if(image !== null) return image;
    else return null;

  const data = await response.buffer();

  Cache.Img.set({
    id, size,
    data
  })
  
  return data; 
}
/*

await Fetch(`https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp?size=${size}`)

*/