import Path from "path";
//* Cache
export const cacheDir = Path.join(process.cwd(), "cache");
export const cacheImgDir = Path.join(cacheDir, "img");
export const cacheUsersFile = Path.join(cacheDir, "users.json");
export const UsersCacheTime = 10000;
