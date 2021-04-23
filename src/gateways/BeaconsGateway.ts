import { IBeacon } from "../entities/IBeacon";
import { testBeacons } from "./BeaconsGateway.testData";
import { IBeaconsGateway } from "./IBeaconsGateway";

export class BeaconsGateway implements IBeaconsGateway {
  public async getAllBeacons(): Promise<IBeacon[]> {
    // TODO: Replace with API call
    return testBeacons;
  }
}
