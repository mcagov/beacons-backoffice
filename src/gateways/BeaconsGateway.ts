import axios from "axios";
import { IBeaconSearchResult } from "entities/IBeaconSearchResult";
import { IAuthGateway } from "../components/auth/IAuthGateway";
import { applicationConfig } from "../config";
import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "./IBeaconsGateway";
import { IBeaconRequestMapper } from "./mappers/BeaconRequestMapper";
import { IBeaconResponseMapper } from "./mappers/BeaconResponseMapper";
const authorityBaseUrl = "https://login.microsoftonline.com";

export class BeaconsGateway implements IBeaconsGateway {
  private _beaconResponseMapper;
  private _beaconRequestMapper;
  private _authGateway;

  public constructor(
    beaconResponseMapper: IBeaconResponseMapper,
    beaconRequestMapper: IBeaconRequestMapper,
    authGateway: IAuthGateway
  ) {
    this._beaconRequestMapper = beaconRequestMapper;
    this._beaconResponseMapper = beaconResponseMapper;
    this._authGateway = authGateway;
  }

  public async getAllBeacons(): Promise<IBeaconSearchResult> {
    const accessToken = await this._authGateway.getAccessToken();

    try {
      const response = await axios.get(`${applicationConfig.apiUrl}/beacons`, {
        timeout: applicationConfig.apiTimeoutMs,
        headers: { Authorization: `Bearer ${accessToken}` },
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
      const response = await axios.patch(
        `${applicationConfig.apiUrl}/beacons/${beaconId}`,
        this._beaconRequestMapper.map(beaconId, updatedFields)
      );
      return response.data;
    } catch (e) {
      throw Error(e);
    }
  }
}
