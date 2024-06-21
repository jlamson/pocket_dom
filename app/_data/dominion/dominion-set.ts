import { Ally } from "./ally";
import { Boon } from "./boon";
import { SupplyCard } from "./supply-card";
import { Event } from "./event";
import { Landmark } from "./landmark";
import { Project } from "./project";
import { SetId, SetOrder } from "./set-id";
import { Way } from "./way";
import { Trait } from "./trait";

export class DominionSet {
  constructor(
    readonly setId: SetId,
    readonly order: number,
    readonly name: string,
    readonly supplyCards: SupplyCard[],
    readonly events: Event[],
    readonly landmarks: Landmark[],
    readonly projects: Project[],
    readonly boons: Boon[],
    readonly ways: Way[],
    readonly allies: Ally[],
    readonly traits: Trait[]
  ) {}

  public static fromJson(json: any) {
    const setId = json["id"] as SetId;
    return new DominionSet(
      setId,
      SetOrder[setId],
      json["name"],
      (json["cards"] || []).map(SupplyCard.fromJson),
      (json["events"] || []).map(Event.fromJson),
      (json["landmarks"] || []).map(Landmark.fromJson),
      (json["projects"] || []).map(Project.fromJson),
      (json["boons"] || []).map(Boon.fromJson),
      (json["ways"] || []).map(Way.fromJson),
      (json["allies"] || []).map(Ally.fromJson),
      (json["traits"] || []).map(Trait.fromJson)
    );
  }
}

export module SetComparators {
  export const setIdsByOrder = (a: SetId, b: SetId): number => {
    return byOrder<SetId>(a, b, setIdOrder);
  };

  export const setIdListsByOrder = (a: SetId[], b: SetId[]): number => {
    return listsByOrder<SetId>(a, b, setIdOrder);
  };

  export const setsByOrder = (a: DominionSet, b: DominionSet): number => {
    return byOrder<DominionSet>(a, b, setOrder);
  };

  export const setListsByOrder = (
    a: DominionSet[],
    b: DominionSet[]
  ): number => {
    return listsByOrder<DominionSet>(a, b, setOrder);
  };

  // Helpers

  const setIdOrder = (setId: SetId): number => {
    return SetOrder[setId];
  };

  const setOrder = (set: DominionSet): number => {
    return set.order;
  };

  const byOrder = <T>(a: T, b: T, orderFn: (item: T) => number): number => {
    return orderFn(a) - orderFn(b);
  };

  const listsByOrder = <T>(
    a: T[],
    b: T[],
    orderFn: (item: T) => number
  ): number => {
    // First check for empty lists and return accordingly
    if (a.length === 0 && b.length === 0) {
      return 0;
    } else if (a.length === 0) {
      return -1;
    } else if (b.length === 0) {
      return 1;
    }

    const bSorted = b.sort((a, b) => byOrder(a, b, orderFn));
    const aSorted = a.sort((a, b) => byOrder(a, b, orderFn));
    // check if the lists are equal
    if (
      aSorted.length == bSorted.length &&
      aSorted.every((item, index) => bSorted[index] === item)
    ) {
      return 0;
    }
    // check if all items in a are in b. If so, a is earlier
    if (
      aSorted.length < bSorted.length &&
      aSorted.every((item) => bSorted.includes(item))
    ) {
      return -1;
    }
    // check if all items in b are in a. If so, b is earlier
    if (
      bSorted.length < aSorted.length &&
      bSorted.every((item) => aSorted.includes(item))
    ) {
      return 1;
    }
    // We now know that these lists aren't sub-sets or equals of eachother. Sort by the earliest item first.
    // If the earliest item is the same, sort by the next item, and so on.
    // In cases where one list is a subset of the other, the shorter list will be considered earlier.
    for (let i = 0; i < Math.min(aSorted.length, bSorted.length); i++) {
      const comparison = orderFn(aSorted[i]) - orderFn(bSorted[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    // At this point, we know that the lists are equal up to the length of the shorter list.
    // So just return the comparison of the lengths of the lists.
    return aSorted.length - bSorted.length;
  };
}
