import * as Utils from "./utils.js";
import * as Constants from "../../constants.js";
const file = Constants.cacheUsersFile;
Utils.touchIf(file, JSON.stringify({
    lastUpdate: 0,
    users: {},
}, undefined, 2));
export function save(json) {
    Utils.writeFile(file, process.env.NODE_ENV === "production"
        ? JSON.stringify(json)
        : JSON.stringify(json, undefined, 2));
}
export function read() {
    const json = Utils.readFile(file);
    return JSON.parse(json);
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
    return (read().users[id] || null);
}
export function getByUsername(username) {
    for (const id in read().users) {
        if (Object.prototype.hasOwnProperty.call(read().users, id)) {
            const element = read().users[id];
            if (element.username === username)
                return element;
        }
    }
}
