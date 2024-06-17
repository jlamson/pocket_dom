import { SetId } from "./set-id";

export class DominionKingdom {
  constructor(
    readonly name: string,
    readonly setIds: SetId[],
    readonly supplyIds: string[],
    readonly baneCardId: string | null,
    readonly eventIds: string[],
    readonly landmarkIds: string[],
    readonly projectIds: string[],
    readonly boonIds: string[],
    readonly wayIds: string[],
    readonly allyIds: string[],
    readonly traitIds: string[],
    readonly metadata: Metadata
  ) {}

  public static fromJson(json: any) {
    return new DominionKingdom(
      json["name"],
      json["sets"],
      json["supply"] || [],
      json["bane"] || null,
      json["events"] || [],
      json["landmarks"] || [],
      json["projects"] || [],
      json["boons"] || [],
      json["ways"] || [],
      json["allies"] || [],
      json["traits"] || [],
      Metadata.fromJson(json["metadata"])
    );
  }

  // A function to generate a unique id for this kingdom based on a combination
  // of all of it's fields.
  public get id(): string {
    return (
      this.name +
      this.setIds.join("") +
      this.supplyIds.join("") +
      (this.baneCardId || "") +
      this.eventIds.join("") +
      this.landmarkIds.join("") +
      this.projectIds.join("") +
      this.boonIds.join("") +
      this.wayIds.join("") +
      this.allyIds.join("") +
      this.traitIds.join("") +
      this.metadata.useColonies +
      this.metadata.useShelters
    );
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
