import { INote, NoteType } from "entities/INote";
import { IEntityLink } from "../../entities/IEntityLink";
import { isoDate } from "../../utils/dateTime";
import { INotesResponse } from "./INotesResponse";

export interface INotesResponseMapper {
  map: (notesApiResponse: INotesResponse) => INote[];
}

export class NotesResponseMapper implements INotesResponseMapper {
  public map(notesApiResponse: INotesResponse): INote[] {
    return notesApiResponse.data.map((note) => {
      return {
        id: note.id,
        text: note.attributes.text || "",
        type: (<any>NoteType)[note.attributes.type || ""],
        createdDate: isoDate(note.attributes.createdDate || ""),
        userId: note.attributes.userId || "",
        fullName: note.attributes.fullName || "",
        email: note.attributes.email || "",
        entityLinks: this.mapLinks(note.links),
      };
    });
  }

  private mapLinks(links: IEntityLink[]): IEntityLink[] {
    return links.map((link) => {
      return { verb: link.verb, path: link.path };
    });
  }
}
