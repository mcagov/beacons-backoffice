export interface INote {
  id: string;
  beaconId: string;
  text: string;
  type: NoteType;
  createdDate: string;
  userId: string;
  fullName: string;
  email: string;
}

export enum NoteType {
  INCIDENT = "INCIDENT",
  GENERAL = "GENERAL",
  RECORD_HISTORY = "RECORD_HISTORY",
}
