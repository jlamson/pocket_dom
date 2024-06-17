`use client`;

import { DominionKingdom } from "./dominion-kingdom";
import { SetId } from "./set-id";
import { allKingdoms } from "../dominion-content";

export class DominionKingdoms {
  static readonly kingdoms: { [key in SetId]?: DominionKingdom[] } =
    DominionKingdoms.createKingdoms();

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
