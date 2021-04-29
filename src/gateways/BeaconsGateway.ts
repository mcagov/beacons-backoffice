import { IBeacon } from "../entities/IBeacon";
import { testBeacons, testSingleBeacon } from "../testData/testBeacons";
import { IBeaconsGateway } from "./IBeaconsGateway";

export class BeaconsGateway implements IBeaconsGateway {
  public async getAllBeacons(): Promise<IBeacon[]> {
    // TODO: Replace with API call
    return Promise.resolve(testBeacons);
  }

  public async getBeacon(beaconId: string): Promise<IBeacon> {
    return Promise.resolve(testSingleBeacon);
  }
}
