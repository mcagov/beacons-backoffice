import { IBeacon } from "../../entities/IBeacon";
import { IBeaconRequest } from "./IBeaconRequest";

export interface IBeaconRequestMapper {
  map: (beaconId: string, beacon: Partial<IBeacon>) => IBeaconRequest;
}
