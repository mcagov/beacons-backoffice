export interface IUse {
  environment: Environments;
  purpose: string;
  activity: string;
  moreDetails: string;
}

export enum Environments {
  Maritime = "MARITIME",
  Aviation = "AVIATION",
  Land = "LAND",
}

export enum Purposes {
  Commercial = "COMMERCIAL",
  Pleasure = "PLEASURE",
  Null = "Null",
}

export enum Activities {
  FishingVessel = "FISHING VESSEL",
  ClimbingMountaineering = "CLIMBING_MOUNTAINEERING",
  Glider = "GLIDER",
}
