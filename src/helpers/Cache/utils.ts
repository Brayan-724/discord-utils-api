import Fs from "fs"
import Path from "path"
import * as Constants from "../../constants.js"

export function resolvePath(path: string) {
  return path.includes(Constants.cacheDir)
    ? path
    : Path.join(Constants.cacheDir, path);
}

export function getPath(path: string): string {
  const _path: string = resolvePath(path);

  if (Fs.existsSync(_path)) {
    return _path;
  }

  throw new ReferenceError(`"${_path}" doesn't exists`);
}

export function readDir(dir: string): string[] {
  const path: string = getPath(dir);
  return Fs.readdirSync(path);
}

export function readFile(file: string): string {
  return readFileBuffer(file).toString("utf8");
}

export function readFileBuffer(file: string): Buffer {
  const path: string = getPath(file);
  return Fs.readFileSync(path);
}

export function writeFile(file: string, data: string | Buffer) {
  const path: string = resolvePath(file);
  Fs.writeFileSync(path, data);
}
