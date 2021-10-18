
export type Snowflake = string;

export interface jsonObject extends Object {
  [key: string]: any | jsonObject
};

export interface DiscordUserInfo {
  id: Snowflake,
  username: string,
  avatar: string | null,
  discriminator: number,
  public_flags: number,
  banner: string | null,
  banner_color: string,
  accent_color: number
}

export interface TypeObject<T = any> {
  [key: string]: T
}