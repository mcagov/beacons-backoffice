import { IBeaconSearchResult } from "entities/IBeaconSearchResult";
import { IBeacon } from "../../entities/IBeacon";

export interface IBeaconsGateway {
  getAllBeacons: (
    term: string,
    status: string,
    uses: string,
    page: number,
    pageSize: number,
    sort: string
  ) => Promise<IBeaconSearchResult>;
  getBeacon: (id: string) => Promise<IBeacon>;
  updateBeacon: (
    beaconId: string,
    updatedFields: Partial<IBeacon>
  ) => Promise<IBeacon>;
}
