import axios from "axios";
import { applicationConfig } from "../config";
import { IOwner } from "../entities/IOwner";
import { IBeaconResponseMapper } from "./mappers/BeaconResponseMapper";

export class OwnerGateway {
  timeoutMs = 10000;
  private _beaconResponseMapper;

  public constructor(beaconResponseMapper: IBeaconResponseMapper) {
    this._beaconResponseMapper = beaconResponseMapper;
  }

  public async getOwner(beaconId: string): Promise<IOwner[]> {
    try {
      const response = await axios.get(
        `${applicationConfig.apiUrl}/beacons/${beaconId}`,
        { timeout: this.timeoutMs }
      );
      return this._beaconResponseMapper.map(response.data).owners;
    } catch (e) {
      throw Error(e);
    }
  }

  public async saveOwner(beaconId: string, owner: IOwner): Promise<boolean> {
    const response = await axios.post(
      `${applicationConfig.apiUrl}/beacons/${beaconId}`,
      {}
    );

    return true;
  }
}
