import { INote, NoteType } from "../entities/INote";
import { deepFreeze } from "../utils";

export const notesFixture = deepFreeze<INote[]>([
  {
    id: "change-me",
    beaconId: "change-me",
    text: "That's a great beacon right there",
    type: NoteType.GENERAL,
    createdDate: "2021-09-24 11:09:55.914918 +00:00",
    userId: "change-me",
    fullName: "Beacon McBeaconFace",
    email: "mcbeaconface@beacons.com",
  },
  {
    id: "change-me",
    beaconId: "change-me",
    text: "That's not a great beacon right here",
    type: NoteType.INCIDENT,
    createdDate: "2021-09-24 11:09:55.914918 +00:00",
    userId: "change-me",
    fullName: "Beacon McBeaconFace",
    email: "mcbeaconface@beacons.com",
  },
]);
