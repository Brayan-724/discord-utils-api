import Path from "path";
import * as Utils from "./utils.js";
import * as Constants from "../../constants.js";
const dir = Constants.cacheImgDir;
const file = Utils.resolvePath("images.json");
export function save(json) {
    Utils.writeFile(file, process.env.NODE_ENV === "production"
        ? JSON.stringify(json)
        : JSON.stringify(json, undefined, 2));
}
export function read() {
    try {
        return JSON.parse(Utils.readFile(file));
    }
    catch (_a) {
        return {
            lastUpdate: 0,
            images: {},
        };
    }
}
export function set(...images) {
    var _a;
    const newImages = {};
    for (const image of images) {
        const newImage = {
            info: {
                id: image.id,
                lastUpdate: Date.now(),
                paths: Object.assign(Object.assign({}, (((_a = getByID(image.id)) === null || _a === void 0 ? void 0 : _a.paths) || [])), { [image.size]: resolveImgPath(image.id, image.size) }),
            },
            size: image.size,
            data: image.data,
        };
        Utils.writeFile(newImage.info.paths[image.size], newImage.data);
        newImages[image.id] = newImage.info;
    }
    const oldJson = read();
    const newJson = {
        lastUpdate: Date.now(),
        images: Object.assign(Object.assign({}, oldJson.images), newImages),
    };
    save(newJson);
    return newJson;
}
export function getByID(id) {
    return read().images[id] || null;
}
export function getImage(id, size) {
    const info = getByID(id);
    if (info === null)
        return null;
    if (typeof info.paths[size] !== "string")
        return null;
    return Utils.readFileBuffer(info.paths[size]);
}
export function resolveImgPath(id, size) {
    return Path.join(dir, `${id}-${size}px.png`);
}
