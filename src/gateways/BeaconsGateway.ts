import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "./IBeaconsGateway";
import { beaconsGatewayFixture } from "./BeaconsGateway.fixture";

export class BeaconsGateway implements IBeaconsGateway {
  public async getAllBeacons(): Promise<any> {
    // TODO: Replace with API call
    return beaconsGatewayFixture;
  }
}
