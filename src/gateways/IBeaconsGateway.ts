import { IBeaconSearchResult } from "entities/IBeaconSearchResult";

export interface IBeaconsGateway {
  getAllBeacons: () => Promise<IBeaconSearchResult>;
}
