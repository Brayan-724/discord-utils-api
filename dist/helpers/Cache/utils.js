import Fs from "fs";
import Path from "path";
import * as Constants from "../../constants.js";
export function resolvePath(path) {
    return path.includes(Constants.cacheDir)
        ? path
        : Path.join(Constants.cacheDir, path);
}
export function getPath(path) {
    const _path = resolvePath(path);
    if (Fs.existsSync(_path)) {
        return _path;
    }
    throw new ReferenceError(`"${_path}" doesn't exists`);
}
export function readDir(dir) {
    const path = getPath(dir);
    return Fs.readdirSync(path);
}
export function readFile(file) {
    return readFileBuffer(file).toString("utf8");
}
export function readFileBuffer(file) {
    const path = getPath(file);
    return Fs.readFileSync(path);
}
export function writeFile(file, data) {
    const path = resolvePath(file);
    Fs.writeFileSync(path, data);
}
