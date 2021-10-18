var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fetch from "../helpers/fetch.js";
import * as Cache from "./cache.js";
import * as Constants from "../constants.js";
export function fetchUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = Cache.Users.getByID(id);
        if (userInfo !== null && Date.now() - userInfo.lastUpdate <= Constants.UsersCacheTime) {
            return userInfo;
        }
        const response = yield Fetch(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                Authorization: `Bot ${process.env.TOKEN}`
            }
        });
        if (!response.ok)
            if (userInfo !== null)
                return userInfo;
            else
                return null;
        const user = (yield response.json());
        Cache.Users.set(Object.assign(Object.assign({}, user), { lastUpdate: Date.now() }));
        return user;
    });
}
