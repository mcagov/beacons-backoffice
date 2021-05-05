import axios from "axios";
import { IBeaconSearchResult } from "entities/IBeaconSearchResult";
import { applicationConfig } from "../config";
import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "./IBeaconsGateway";
import { IBeaconResponseMapper } from "./translators/BeaconResponseMapper";

export class BeaconsGateway implements IBeaconsGateway {
  timeoutMs = 10000;
  private _translator;

  public constructor(beaconResponseTranslator: IBeaconResponseMapper) {
    this._translator = beaconResponseTranslator;
  }

  public async getAllBeacons(): Promise<IBeaconSearchResult> {
    try {
      const response = await axios.get(`${applicationConfig.apiUrl}/beacons`, {
        timeout: this.timeoutMs,
      });
      // TODO: Add translate step to /beacons endpoint
      return response.data;
    } catch (e) {
      throw Error(e);
    }
  }

  public async getBeacon(beaconId: string): Promise<IBeacon> {
    try {
      const response = await axios.get(
        `${applicationConfig.apiUrl}/beacon/${beaconId}`,
        { timeout: this.timeoutMs }
      );
      return this._translator.translate(response.data);
    } catch (e) {
      throw Error(e);
    }
  }
}
