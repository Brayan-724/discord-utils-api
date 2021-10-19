import Fs from "fs";
import Path from "path";
import * as Constants from "../../constants.js";
export function resolvePath(path) {
    return path.includes(Constants.cacheDir)
        ? path
        : Path.join(Constants.cacheDir, path);
}
export function exists(path) {
    return Fs.existsSync(resolvePath(path));
}
export function getPath(path) {
    const _path = resolvePath(path);
    createIf(_path);
    return _path;
}
export function createIf(path, _default = "") {
    if (exists(path))
        return;
    if (path.match(/.*\..+$/) === null) {
        mkdirIf(path);
    }
    else {
        touchIf(path, _default);
    }
}
export function touchIf(_path, _default) {
    const path = resolvePath(_path);
    if (exists(path))
        return;
    mkdirIf(Path.dirname(resolvePath(path)));
    writeFile(resolvePath(path), _default);
}
export function mkdirIf(_path) {
    const path = resolvePath(_path);
    if (exists(path))
        return;
    // mkdirIf(Path.dirname(path))
    Fs.mkdirSync(resolvePath(path));
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
    mkdirIf(Path.dirname(resolvePath(path)));
    Fs.writeFileSync(path, data);
}
