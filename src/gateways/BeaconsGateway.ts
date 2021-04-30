import axios from "axios";
import { IBeaconSearchResult } from "entities/IBeaconSearchResult";
import { applicationConfig } from "../config";
import { IBeacon } from "../entities/IBeacon";
import { testSingleBeacon } from "../testData/testBeacons";
import { IBeaconsGateway } from "./IBeaconsGateway";

export class BeaconsGateway implements IBeaconsGateway {
  public async getAllBeacons(): Promise<IBeaconSearchResult> {
    const response = await axios.get(`${applicationConfig.apiUrl}/beacons`);

    return response.data;
  }

  public async getBeacon(beaconId: string): Promise<IBeacon> {
    return Promise.resolve(testSingleBeacon);
  }
}
