import axios, { AxiosResponse } from "axios";
import { applicationConfig } from "config";
import { IBeacon } from "entities/IBeacon";
import { IBeaconSearchResult } from "entities/IBeaconSearchResult";
import { IAuthGateway } from "gateways/auth/IAuthGateway";
import { IBeaconRequestMapper } from "gateways/mappers/BeaconRequestMapper";
import { IBeaconResponseMapper } from "gateways/mappers/BeaconResponseMapper";
import { IBeaconsGateway } from "./IBeaconsGateway";

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
    try {
      const response = await this._makeGetRequest("/beacons");
      // TODO: Add map step to /beacons endpoint
      return response.data;
    } catch (e) {
      console.error(e);
      throw Error(e);
    }
  }

  public async getBeacon(beaconId: string): Promise<IBeacon> {
    try {
      const response = await this._makeGetRequest(`/beacons/${beaconId}`);

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
      const response = await this._makePatchRequest(
        `/beacons/${beaconId}`,
        beaconId,
        updatedFields
      );
      return response.data;
    } catch (e) {
      throw Error(e);
    }
  }

  private async _makeGetRequest(path: string): Promise<AxiosResponse> {
    const accessToken = await this._authGateway.getAccessToken();

    return await axios.get(`${applicationConfig.apiUrl}${path}`, {
      timeout: applicationConfig.apiTimeoutMs,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  private async _makePatchRequest(
    path: string,
    beaconId: string,
    updatedFields: Partial<IBeacon>
  ): Promise<AxiosResponse> {
    const accessToken = await this._authGateway.getAccessToken();

    return await axios.patch(
      `${applicationConfig.apiUrl}${path}`,
      this._beaconRequestMapper.map(beaconId, updatedFields),
      {
        timeout: applicationConfig.apiTimeoutMs,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  }
}
