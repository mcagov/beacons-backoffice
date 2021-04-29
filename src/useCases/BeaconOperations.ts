import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";

export class BeaconOperations {
  beaconsGateway: IBeaconsGateway;

  constructor(beaconsGateway: IBeaconsGateway) {
    this.beaconsGateway = beaconsGateway;
  }

  public async getBeacon(id: string): Promise<IBeacon> {
    try {
      return await this.beaconsGateway.getBeacon(id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
