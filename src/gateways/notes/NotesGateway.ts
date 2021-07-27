import axios, { AxiosResponse } from "axios";
import { applicationConfig } from "config";
import { INote } from "entities/INote";
import { IAuthGateway } from "gateways/auth/IAuthGateway";
import { INotesGateway } from "./INotesGateway";
import { INotesResponse } from "./INotesResponse";
import { INotesResponseMapper } from "./NotesResponseMapper";

export class NotesGateway implements INotesGateway {
  private _authGateway;
  private _mapper: INotesResponseMapper;

  public constructor(authGateway: IAuthGateway, mapper: INotesResponseMapper) {
    this._authGateway = authGateway;
    this._mapper = mapper;
  }

  public async getNotes(beaconId: string): Promise<INote[]> {
    try {
      const response = await this._makeGetRequest(`/beacons/${beaconId}/notes`);

      return this._mapper.map(response.data);
    } catch (e) {
      throw Error(e);
    }
  }

  private async _makeGetRequest(
    path: string
  ): Promise<AxiosResponse<INotesResponse>> {
    const accessToken = await this._authGateway.getAccessToken();

    return await axios.get<any, AxiosResponse<INotesResponse>>(
      `${applicationConfig.apiUrl}${path}`,
      {
        timeout: applicationConfig.apiTimeoutMs,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  }
}
