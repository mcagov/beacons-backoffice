export interface IUse {
  id: string;
  environment: Environments;
  purpose?: string;
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
}

export enum Activities {
  FishingVessel = "FISHING_VESSEL",
  ClimbingMountaineering = "CLIMBING_MOUNTAINEERING",
  Glider = "GLIDER",
}
