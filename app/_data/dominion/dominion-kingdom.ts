import { SetId } from "./set-id";

export class DominionKingdom {
  constructor(
    readonly name: string,
    readonly setIds: SetId[],
    readonly supplyIds: string[],
    readonly baneCardId: string | null,
    readonly ferrymanCardId: string | null,
    readonly obeliskCardId: string | null,
    readonly wayofthemouseCardId: string | null,
    readonly eventIds: string[],
    readonly landmarkIds: string[],
    readonly projectIds: string[],
    readonly boonIds: string[],
    readonly wayIds: string[],
    readonly allyIds: string[],
    readonly traitIds: string[],
    readonly traitSupplyIds: string[],
    readonly prophecyIds: string[],
    readonly riverboatCardId: string | null,
    readonly approachingarmyCardId: string | null,
    readonly metadata: Metadata
  ) {}

  public static fromJson(json: any) {
    return new DominionKingdom(
      json["name"],
      json["sets"],
      json["supply"] || [],
      json["bane"] || null,
      json["ferrymanGain"] || null,
      json["obeliskActionCard"] || null,
      json["wayofthemouseActionCard"] || null,
      json["events"] || [],
      json["landmarks"] || [],
      json["projects"] || [],
      json["boons"] || [],
      json["ways"] || [],
      json["allies"] || [],
      json["traits"] || [],
      json["traitSupplies"] || [],
      json["prophecies"] || [],
      json["riverboatActionCard"] || null,
      json["approachingarmyActionCard"] || null,
      Metadata.fromJson(json["metadata"])
    );
  }

  private _id: string | undefined;

  public get id(): string {
    if (!this._id) {
      this._id = [this.name, ...this.setIds.sort()].join("_");
    }
    return this._id;
  }
}

export class Metadata {
  constructor(readonly useColonies: boolean, readonly useShelters: boolean) {}

  public static fromJson(json: any | null) {
    return new Metadata(
      json ? json["colonies"] : false,
      json ? json["shelters"] : false
    );
  }
}
