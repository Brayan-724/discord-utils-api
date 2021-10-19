import Path from "path";
import * as Utils from "./utils.js";
import * as Constants from "../../constants.js";
import { jsonObject, Snowflake, TypeObject } from "../../types.js";

const dir: string = Constants.cacheImgDir;
const file: string = Utils.resolvePath("images.json");

Utils.touchIf(file, JSON.stringify({
  lastUpdate: 0,
  images: {},
}, undefined, 2))

export interface ImgData extends jsonObject {
  info: ImgInfo;
  size: number;
  data: Buffer;
}

export interface ImgInfo extends jsonObject {
  id: Snowflake;
  lastUpdate: number;
  paths: {
    [size: number]: string;
  };
}

export interface ImgsCache extends jsonObject {
  lastUpdate: number;
  images: TypeObject<ImgInfo>;
}

export function save(json: ImgsCache) {
  Utils.writeFile(
    file,
    process.env.NODE_ENV === "production"
      ? JSON.stringify(json)
      : JSON.stringify(json, undefined, 2)
  );
}

export function read(): ImgsCache {
  return JSON.parse(Utils.readFile(file));
}

export interface ImgSetData {
  id: Snowflake;
  size: number;
  data: Buffer;
}

export function set(...images: ImgSetData[]): ImgsCache {
  const newImages: TypeObject<ImgInfo> = {};
  for (const image of images) {
    const newImage: ImgData = {
      info: {
        id: image.id,
        lastUpdate: Date.now(),
        paths: {
          ...(getByID(image.id)?.paths || []),
          [image.size]: resolveImgPath(image.id, image.size),
        },
      },
      size: image.size,
      data: image.data,
    };

    Utils.writeFile(newImage.info.paths[image.size], newImage.data);

    newImages[image.id] = newImage.info;
  }

  const oldJson: ImgsCache = read();
  const newJson: ImgsCache = {
    lastUpdate: Date.now(),
    images: {
      ...oldJson.images,
      ...newImages,
    },
  };

  save(newJson);

  return newJson;
}

export function getByID(id: Snowflake): ImgInfo {
  return read().images[id] || null;
}

export function getImage(id: Snowflake, size: number): Buffer | null {
  const info: ImgInfo | null = getByID(id);

  if (info === null) return null;
  if (typeof info.paths[size] !== "string") return null;

  return Utils.readFileBuffer(info.paths[size]);
}

export function resolveImgPath(id: Snowflake, size: number): string {
  return Path.join(dir, `${id}-${size}px.png`);
}
