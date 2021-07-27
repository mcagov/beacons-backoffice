import { IEntityLink } from "./IEntityLink";

export interface INote {
  id: string;
  entityLinks: IEntityLink[];
  text: string;
  type: NoteType;
  createdDate: string;
  userId: string;
  fullName: string;
  email: string;
}

export enum NoteType {
  INCIDENT,
  GENERAL,
  RECORD_HISTORY,
}
