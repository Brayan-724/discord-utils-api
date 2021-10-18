import { cacheDir, cacheImgDir } from "../constants.js";
import Fs from "fs";
if (!Fs.existsSync(cacheDir))
    Fs.mkdirSync(cacheDir);
if (!Fs.existsSync(cacheImgDir))
    Fs.mkdirSync(cacheImgDir);
export * as Users from "./Cache/users.js";
export * as Img from "./Cache/img.js";
