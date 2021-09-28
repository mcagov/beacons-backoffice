import { INote } from "../../entities/INote";

export interface INotesGateway {
  getNotes: (beaconId: string) => Promise<INote[]>;
  createNote: (note: INote) => Promise<INote>;
}
