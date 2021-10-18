import * as Utils from "./utils.js";
import * as Constants from "../../constants.js";
const file = Constants.cacheUsersFile;
export function save(json) {
    Utils.writeFile(file, process.env.NODE_ENV === "production"
        ? JSON.stringify(json)
        : JSON.stringify(json, undefined, 2));
}
export function read() {
    try {
        const json = Utils.readFile(file);
        return JSON.parse(json);
    }
    catch (_a) {
        return {
            lastUpdate: 0,
            users: {},
        };
    }
}
export function set(...users) {
    const oldJson = read();
    const newJson = {
        lastUpdate: Date.now(),
        users: Object.assign(Object.assign({}, oldJson.users), (users.reduce((c, v) => {
            c[v.id] = v;
            return c;
        }, {}))),
    };
    save(newJson);
    return newJson;
}
export function getByID(id) {
    return (read().users.find((value) => {
        return value.id === id;
    }) || null);
}
export function getByUsername(username) {
    return (read().users.find((value) => {
        return value.username === username;
    }) || null);
}
