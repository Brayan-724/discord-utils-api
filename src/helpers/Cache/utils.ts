import e from "express";
import Fs from "fs";
import Path from "path";
import * as Constants from "../../constants.js";

export function resolvePath(path: string) {
  return path.includes(Constants.cacheDir)
    ? path
    : Path.join(Constants.cacheDir, path);
}

export function exists(path: string): boolean {
  return Fs.existsSync(resolvePath(path));
}

export function getPath(path: string): string {
  const _path: string = resolvePath(path);

  createIf(_path);

  return _path;
}

export function createIf(path: string, _default: string | Buffer = "") {
  if(exists(path)) return;

  if (path.match(/.*\..+$/) === null) {
    mkdirIf(path);
  } else {
    touchIf(path, _default);
  }
}

export function touchIf(_path: string, _default: string | Buffer) {
  const path = resolvePath(_path);
  if (exists(path)) return;
  
  mkdirIf(Path.dirname(resolvePath(path)));

  writeFile(resolvePath(path), _default);
}

export function mkdirIf(_path: string) {
  const path = resolvePath(_path);
  if (exists(path)) return;

  // mkdirIf(Path.dirname(path))

  Fs.mkdirSync(resolvePath(path));
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
  
  mkdirIf(Path.dirname(resolvePath(path)));

  Fs.writeFileSync(path, data);
}
