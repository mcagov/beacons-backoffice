import axios, { AxiosResponse } from "axios";
import { IBeaconSearchResult } from "entities/IBeaconSearchResult";
import { applicationConfig } from "../config";
import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "./IBeaconsGateway";
import { IBeaconResponseMapper } from "./mappers/BeaconResponseMapper";

export class BeaconsGateway implements IBeaconsGateway {
  timeoutMs = 10000;
  private _beaconResponseMapper;

  public constructor(beaconResponseMapper: IBeaconResponseMapper) {
    this._beaconResponseMapper = beaconResponseMapper;
  }

  public async getAllBeacons(): Promise<IBeaconSearchResult> {
    try {
      const response = await axios.get(`${applicationConfig.apiUrl}/beacons`, {
        timeout: this.timeoutMs,
      });
      // TODO: Add map step to /beacons endpoint
      return response.data;
    } catch (e) {
      throw Error(e);
    }
  }

  public async getBeacon(beaconId: string): Promise<IBeacon> {
    try {
      const response = await axios.get(
        `${applicationConfig.apiUrl}/beacons/${beaconId}`,
        { timeout: this.timeoutMs }
      );
      return this._beaconResponseMapper.map(response.data);
    } catch (e) {
      throw Error(e);
    }
  }

  public async saveBeacon(
    beaconId: string,
    updatedFields: Partial<IBeacon>
  ): Promise<boolean> {
    try {
      const response = await axios.patch(
        `${applicationConfig.apiUrl}/beacons/${beaconId}`,
        updatedFields
      );
      return this.isSuccessful(response);
    } catch (e) {
      throw Error(e);
    }
  }

  private isSuccessful(response: AxiosResponse) {
    return 200 >= response.status && response.status <= 299;
  }
}
