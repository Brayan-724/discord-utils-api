export enum PublicFlags {
  None = 0,
  STAFF = 1 << 0,
  PARTNER = 1 << 1,
  HYPESQUAD = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
  HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
  HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
  PREMIUM_EARLY_SUPPORTER = 1 << 9,
  TEAM_PSEUDO_USER = 1 << 10,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  VERIFIED_BOT = 1 << 16,
  VERIFIED_DEVELOPER = 1 << 17,
  CERTIFIED_MODERATOR = 1 << 18,
  BOT_HTTP_INTERACTIONS = 1 << 19,
}

export enum PublicFlagsDescription {
  None = "None",
  STAFF = "Discord Employee",
  PARTNER = "Partnered Server Owner",
  HYPESQUAD = "HypeSquad Events Coordinator",
  BUG_HUNTER_LEVEL_1 = "Bug Hunter Level 1",
  HYPESQUAD_ONLINE_HOUSE_1 = "House Bravery Member",
  HYPESQUAD_ONLINE_HOUSE_2 = "House Brilliance Member",
  HYPESQUAD_ONLINE_HOUSE_3 = "House Balance Member",
  PREMIUM_EARLY_SUPPORTER = "Early Nitro Supporter",
  TEAM_PSEUDO_USER = "User is a team",
  BUG_HUNTER_LEVEL_2 = "Bug Hunter Level 2",
  VERIFIED_BOT = "Verified Bot",
  VERIFIED_DEVELOPER = "Early Verified Bot Developer",
  CERTIFIED_MODERATOR = "Discord Certified Moderator",
  BOT_HTTP_INTERACTIONS = "Bot uses only HTTP interactions and is shown in the online member list",
}

export const PublicFlagsDescriptionByFlag: { [flag: number]: string } = {
  [PublicFlags.None]: PublicFlagsDescription.None,
  [PublicFlags.STAFF]: PublicFlagsDescription.STAFF,
  [PublicFlags.PARTNER]: PublicFlagsDescription.PARTNER,
  [PublicFlags.HYPESQUAD]: PublicFlagsDescription.HYPESQUAD,
  [PublicFlags.BUG_HUNTER_LEVEL_1]: PublicFlagsDescription.BUG_HUNTER_LEVEL_1,
  [PublicFlags.HYPESQUAD_ONLINE_HOUSE_1]:
    PublicFlagsDescription.HYPESQUAD_ONLINE_HOUSE_1,
  [PublicFlags.HYPESQUAD_ONLINE_HOUSE_2]:
    PublicFlagsDescription.HYPESQUAD_ONLINE_HOUSE_2,
  [PublicFlags.HYPESQUAD_ONLINE_HOUSE_3]:
    PublicFlagsDescription.HYPESQUAD_ONLINE_HOUSE_3,
  [PublicFlags.PREMIUM_EARLY_SUPPORTER]:
    PublicFlagsDescription.PREMIUM_EARLY_SUPPORTER,
  [PublicFlags.TEAM_PSEUDO_USER]: PublicFlagsDescription.TEAM_PSEUDO_USER,
  [PublicFlags.BUG_HUNTER_LEVEL_2]: PublicFlagsDescription.BUG_HUNTER_LEVEL_2,
  [PublicFlags.VERIFIED_BOT]: PublicFlagsDescription.VERIFIED_BOT,
  [PublicFlags.VERIFIED_DEVELOPER]: PublicFlagsDescription.VERIFIED_DEVELOPER,
  [PublicFlags.CERTIFIED_MODERATOR]: PublicFlagsDescription.CERTIFIED_MODERATOR,
  [PublicFlags.BOT_HTTP_INTERACTIONS]:
    PublicFlagsDescription.BOT_HTTP_INTERACTIONS,
};
