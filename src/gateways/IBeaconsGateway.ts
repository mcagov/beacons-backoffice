import { IBeacon } from "../entities/IBeacon";

export interface IBeaconsGateway {
  getAllBeacons: () => Promise<IBeacon[]>;
}
