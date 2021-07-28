import { INote, NoteType } from "entities/INote";
import { deepFreeze } from "../utils";

const getNoteFixture = (id: string, noteType: NoteType): INote =>
  deepFreeze({
    id,
    entityLinks: [],
    text: "the text of a note",
    type: noteType,
    createdDate: "2018-06-08",
    userId: "8572e782-2f50-40bc-9ea3-1e2e6bd04fd3",
    fullName: "mr note taker",
    email: "noteEmail@an-email.com",
  });

export const notesFixture: INote[] = deepFreeze([
  {
    ...getNoteFixture("a00036c4-e3f4-46bb-aa9e-1d91870d9172", NoteType.GENERAL),
  },
  {
    ...getNoteFixture(
      "b00036c4-e3f4-46bb-aa9e-1d91870d9173",
      NoteType.INCIDENT
    ),
  },
]);
