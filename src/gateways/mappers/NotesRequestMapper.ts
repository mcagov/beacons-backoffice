import { INote } from "../../entities/INote";
import { INoteRequest } from "./INoteRequest";

export interface INotesRequestMapper {
  map: (note: Partial<INote>) => INoteRequest;
}

export class NotesRequestMapper implements INotesRequestMapper {
  public map(note: INote): INoteRequest {
    return {
      data: {
        type: "note",
        attributes: {
          beaconId: note.beaconId || "",
          text: note.text || "",
          type: note.type || "",
        },
      },
    };
  }
}
