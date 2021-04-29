import { IBeacon } from "../entities/IBeacon";
import { testBeacons, testSingleBeacon } from "../testData/testBeacons";
import { IBeaconsGateway } from "./IBeaconsGateway";
import { applicationConfig } from "../config";
import axios from "axios";
import { IBeaconSearchResult } from "entities/IBeaconSearchResult";

export class BeaconsGateway implements IBeaconsGateway {
  public async getAllBeacons(): Promise<IBeaconSearchResult> {
    const response = await axios.get(`${applicationConfig.apiUrl}/beacons`);

    return response.data;
  }

  public async getBeacon(beaconId: string): Promise<IBeacon> {
    return Promise.resolve(testSingleBeacon);
  }
}
