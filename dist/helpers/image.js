var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fetch from "node-fetch";
import * as Cache from "./cache.js";
import * as Constants from "../constants.js";
import { fetchUser } from "./user.js";
export function fetchImg(id, size) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageInfo = Cache.Img.getByID(id);
        const image = Cache.Img.getImage(id, size);
        if (imageInfo !== null && image !== null && Date.now() - imageInfo.lastUpdate <= Constants.UsersCacheTime) {
            return image;
        }
        const user = yield fetchUser(id);
        const response = yield Fetch(`https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp?size=${size}`, {
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`
            }
        });
        if (!response.ok)
            if (image !== null)
                return image;
            else
                return null;
        const data = yield response.buffer();
        Cache.Img.set({
            id, size,
            data
        });
        return data;
    });
}
/*

await Fetch(`https://cdn.discordapp.com/avatars/${id}/${user.avatar}.webp?size=${size}`)

*/ 
