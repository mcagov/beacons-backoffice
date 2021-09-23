import axios, { AxiosResponse } from "axios";
import { applicationConfig } from "../../config";
import { INote } from "../../entities/INote";
import { IAuthGateway } from "../auth/IAuthGateway";
import { INotesResponseMapper } from "../mappers/NotesResponseMapper";
import { INotesGateway } from "./INotesGateway";

export class NotesGateway implements INotesGateway {
  private _notesResponseMapper: INotesResponseMapper;
  private _authGateway: IAuthGateway;

  public constructor(
    notesResponseMapper: INotesResponseMapper,
    authGateway: IAuthGateway
  ) {
    this._notesResponseMapper = notesResponseMapper;
    this._authGateway = authGateway;
  }

  public async getNotes(beaconId: string): Promise<INote[]> {
    try {
      const response = await this._makeGetRequest(`/beacons/${beaconId}/notes`);
      return this._notesResponseMapper.map(response.data);
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
}
