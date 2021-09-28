import { INote, NoteType } from "../../entities/INote";
import { INoteResponse } from "./INoteResponse";
import { INoteResponseData } from "./INoteResponseData";
import { INotesResponse } from "./INotesResponse";

export interface INotesResponseMapper {
  map: (noteResponse: INoteResponse) => INote;
  mapList: (notesResponse: INotesResponse) => INote[];
}

export class NotesResponseMapper implements INotesResponseMapper {
  public map(noteResponse: INoteResponse): INote {
    return this._mapData(noteResponse.data);
  }

  public mapList(notesResponse: INotesResponse): INote[] {
    if (!notesResponse.data || notesResponse.data.length === 0) return [];

    return notesResponse.data.map((noteResponseData) =>
      this._mapData(noteResponseData)
    );
  }

  private _mapData(responseData: INoteResponseData) {
    return {
      id: responseData.id,
      beaconId: responseData.attributes.beaconId,
      text: responseData.attributes.text,
      type: NoteType[responseData.attributes.type as NoteType],
      createdDate: responseData.attributes.createdDate,
      userId: responseData.attributes.userId,
      fullName: responseData.attributes.fullName,
      email: responseData.attributes.email,
    };
  }
}
