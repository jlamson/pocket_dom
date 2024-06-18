`use client`;

import { DominionKingdom } from "./dominion-kingdom";
import { SetId } from "./set-id";
import { allKingdoms } from "../dominion-content";

export class DominionKingdoms {
  static readonly kingdoms: { [key in SetId]?: DominionKingdom[] } =
    DominionKingdoms.createKingdoms();

  private static _allKingdoms: DominionKingdom[] | undefined;

  public static getAllKingdoms(): DominionKingdom[] {
    if (!this._allKingdoms) {
      const allKingdoms = Object.values(DominionKingdoms.kingdoms).flat();
      const uniqueKingdomIds = new Set(
        allKingdoms.map((kingdom) => kingdom.id)
      );
      this._allKingdoms = Array.from(uniqueKingdomIds).map(
        (id) =>
          allKingdoms.find((kingdom) => kingdom.id === id) as DominionKingdom
      );
    }
    return this._allKingdoms;
  }

  public static getKingdomsForSets(setIds: SetId[]): DominionKingdom[] {
    return this.getAllKingdoms().filter((kingdom) =>
      setIds.every((setId) => kingdom.setIds.includes(setId))
    );
  }

  public static getKingdomById(kingdomId: string): DominionKingdom | null {
    return (
      this.getAllKingdoms().find((kingdom) => kingdom.id === kingdomId) ?? null
    );
  }

  private static createKingdoms() {
    const setIds = Object.keys(allKingdoms) as SetId[];
    const sets: { [key in SetId]?: DominionKingdom[] } = {};
    for (let setId of setIds) {
      const kingdoms = allKingdoms[setId].kingdoms;
      sets[setId] = kingdoms.map((json: any) => DominionKingdom.fromJson(json));
    }
    return sets;
  }
}
