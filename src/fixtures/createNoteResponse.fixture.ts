import { INoteResponse } from "../gateways/mappers/INoteResponse";
import { deepFreeze } from "../utils";

export const createNoteResponseFixture = deepFreeze<INoteResponse>({
  meta: {},
  data: {
    type: "note",
    id: "bc6d7716-f8cd-469e-a701-10cac3775eb5",
    attributes: {
      beaconId: "8b0c56-77d3-42da-8d0a-48f987eeac4c",
      text: "That's a great beacon right there",
      type: "GENERAL",
      createdDate: "2021-09-24 11:09:55.914918 +00:00",
      userId: "344848b9-8a5d-4818-a57d-1815528d543e",
      fullName: "Jean ValJean",
      email: "24601@jail.fr",
    },
    relationships: {},
  },
  included: [],
});
