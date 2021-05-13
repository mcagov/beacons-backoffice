import axios from "axios";
import { IBeaconSearchResult } from "entities/IBeaconSearchResult";
import { applicationConfig } from "../config";
import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "./IBeaconsGateway";
import { IBeaconResponseMapper } from "./mappers/BeaconResponseMapper";

export class BeaconsGateway implements IBeaconsGateway {
  private _beaconResponseMapper;

  public constructor(beaconResponseMapper: IBeaconResponseMapper) {
    this._beaconResponseMapper = beaconResponseMapper;
  }

  public async getAllBeacons(): Promise<IBeaconSearchResult> {
    try {
      const response = await axios.get(`${applicationConfig.apiUrl}/beacons`, {
        timeout: applicationConfig.apiTimeoutMs,
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
        { timeout: applicationConfig.apiTimeoutMs }
      );
      return this._beaconResponseMapper.map(response.data);
    } catch (e) {
      throw Error(e);
    }
  }

  public async updateBeacon(
    beaconId: string,
    updatedFields: Partial<IBeacon>
  ): Promise<IBeacon> {
    try {
      // TODO: add a this._beaconRequestMapper object to map an IBeacon to the format the API expects to receive.
      const response = await axios.patch(
        `${applicationConfig.apiUrl}/beacons/${beaconId}`,
        updatedFields
      );
      return response.data;
    } catch (e) {
      throw Error(e);
    }
  }
}
