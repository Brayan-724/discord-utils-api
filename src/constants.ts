import Path from "path"

//* Cache
export const cacheDir: string = Path.join(process.cwd(), "cache");
export const cacheImgDir: string = Path.join(cacheDir, "img");
export const cacheUsersFile: string = Path.join(cacheDir, "users.json")

export const UsersCacheTime: number = 10_000;