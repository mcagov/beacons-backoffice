import { IBeaconsGateway } from "./IBeaconsGateway";
import { applicationConfig } from "../config";
import axios from "axios";

export class BeaconsGateway implements IBeaconsGateway {
  public async getAllBeacons(): Promise<any> {
    const response = await axios.get(`${applicationConfig.apiUrl}/beacons`);

    return response.data;
  }
}
