import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "./IBeaconsGateway";
import { testBeacons, testSingleBeacon } from "../testData/testBeacons";

export class BeaconsGateway implements IBeaconsGateway {
  public async getAllBeacons(): Promise<IBeacon[]> {
    // TODO: Replace with API call
    return Promise.resolve(testBeacons);
  }

  public async getBeacon(beaconId: string): Promise<IBeacon> {
    return Promise.resolve(testSingleBeacon);
  }
}
