import { INote } from "entities/INote";
import { deepFreeze } from "../utils";

const getNoteFixture = (id: string): INote =>
  deepFreeze({
    id,
  });

export const notesFixture: INote[] = deepFreeze([
  {
    ...getNoteFixture("e00036c4-e3f4-46bb-aa9e-1d91870d9172"),
  },
  {
    ...getNoteFixture("f00036c4-e3f4-46bb-aa9e-1d91870d9173"),
  },
]);
