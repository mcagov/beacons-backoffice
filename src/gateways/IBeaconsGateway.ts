import { IBeaconSearchResult } from "entities/IBeaconSearchResult";
import { IBeacon } from "../entities/IBeacon";

export interface IBeaconsGateway {
  getAllBeacons: () => Promise<IBeaconSearchResult>;
  getBeacon: (id: string) => Promise<IBeacon>;
  saveBeacon: (
    beaconId: string,
    updatedFields: Partial<IBeacon>
  ) => Promise<Boolean>;
}
