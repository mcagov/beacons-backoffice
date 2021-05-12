import axios from "axios";
import { applicationConfig } from "config";
import { IUse } from "entities/IUse";
import { IUsesGateway } from "./IUsesGateway";
import { IBeaconResponseMapper } from "./mappers/BeaconResponseMapper";

export class UsesGateway implements IUsesGateway {
  private _usesResponseMapper;

  public constructor(usesResponseMapper: IBeaconResponseMapper) {
    this._usesResponseMapper = usesResponseMapper;
  }

  public async getUses(beaconId: string): Promise<IUse[]> {
    try {
      const response = await axios.get(
        `${applicationConfig.apiUrl}/beacons/${beaconId}`,
        { timeout: applicationConfig.apiTimeoutMs }
      );
      return this._usesResponseMapper.map(response.data).uses;
    } catch (e) {
      throw Error(e);
    }
  }
}
