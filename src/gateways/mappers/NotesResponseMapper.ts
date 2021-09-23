import { INote } from "../../entities/INote";
import { INotesResponse } from "./INotesResponse";

export interface INotesResponseMapper {
  map: (notesResponse: INotesResponse) => INote[];
}

export class NotesResponseMapper implements INotesResponseMapper {
  public map(notesResponse: INotesResponse): INote[] {
    const notes: INote[] = [];

    if (!notesResponse.data || notesResponse.data.length === 0) return [];

    notesResponse.data.forEach((noteResponse) => {
      notes.push({
        id: noteResponse.id,
        beaconId: noteResponse.attributes.beaconId,
        text: noteResponse.attributes.text,
        type: noteResponse.attributes.type,
        userId: noteResponse.attributes.userId,
        fullName: noteResponse.attributes.fullName,
        email: noteResponse.attributes.email,
      });
    });

    return notes;
  }
}
