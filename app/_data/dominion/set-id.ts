export enum SetId {
  ADVENTURES = "adventures",
  ALCHEMY = "alchemy",
  ALLIES = "allies",
  BASE_SET = "baseset",
  BASE_SET_2 = "baseset2",
  CORNUCOPIA = "cornucopia",
  DARK_AGES = "darkages",
  EMPIRES = "empires",
  GUILDS = "guilds",
  GUILDSCORNUCOPIA = "guildscornucopia",
  HINTERLANDS = "hinterlands",
  HINTERLANDS_2 = "hinterlands2",
  INTRIGUE = "intrigue",
  INTRIGUE_2 = "intrigue2",
  MENAGERIE = "menagerie",
  NOCTURNE = "nocturne",
  PLUNDER = "plunder",
  PROMOS = "promos",
  PROSPERITY = "prosperity",
  PROSPERITY_2 = "prosperity2",
  RENAISSANCE = "renaissance",
  SEASIDE = "seaside",
  SEASIDE_2 = "seaside2",
}

export const SetOrder: Record<SetId, number> = {
  [SetId.BASE_SET]: 1,
  [SetId.BASE_SET_2]: 1.1,
  [SetId.INTRIGUE]: 2,
  [SetId.INTRIGUE_2]: 2.1,
  [SetId.SEASIDE]: 3,
  [SetId.SEASIDE_2]: 3.1,
  [SetId.ALCHEMY]: 4,
  [SetId.PROSPERITY]: 5,
  [SetId.PROSPERITY_2]: 5.1,
  [SetId.CORNUCOPIA]: 6,
  [SetId.HINTERLANDS]: 7,
  [SetId.HINTERLANDS_2]: 7.1,
  [SetId.DARK_AGES]: 8,
  [SetId.GUILDS]: 9,
  // Technically this combined set was released after Plunder, but for sorting
  // purposes we want to put it with the standalone Guild set.
  [SetId.GUILDSCORNUCOPIA]: 9,
  [SetId.ADVENTURES]: 10,
  [SetId.EMPIRES]: 11,
  [SetId.NOCTURNE]: 12,
  [SetId.RENAISSANCE]: 13,
  [SetId.MENAGERIE]: 14,
  [SetId.ALLIES]: 15,
  [SetId.PLUNDER]: 16,
  [SetId.PROMOS]: 999,
};

export const FirstEditionSets: SetId[] = [
  SetId.BASE_SET,
  SetId.INTRIGUE,
  SetId.SEASIDE,
  SetId.PROSPERITY,
  SetId.HINTERLANDS,
];

export const NotFilterableSets: SetId[] = [
  SetId.GUILDSCORNUCOPIA,
  SetId.PROMOS,
];

export const SecondEditionSets: SetId[] = [
  SetId.BASE_SET_2,
  SetId.INTRIGUE_2,
  SetId.SEASIDE_2,
  SetId.PROSPERITY_2,
  SetId.HINTERLANDS_2,
];

export const FirstToSecondEdition: Map<SetId, SetId> = new Map([
  [SetId.BASE_SET, SetId.BASE_SET_2],
  [SetId.INTRIGUE, SetId.INTRIGUE_2],
  [SetId.SEASIDE, SetId.SEASIDE_2],
  [SetId.PROSPERITY, SetId.PROSPERITY_2],
  [SetId.HINTERLANDS, SetId.HINTERLANDS_2],
]);
