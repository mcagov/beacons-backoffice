import { IBeacon } from "../entities/IBeacon";

export interface IBeaconsGateway {
  getAllBeacons: () => Promise<IBeacon[]>;
  getBeacon: (id: string) => Promise<IBeacon>;
}
