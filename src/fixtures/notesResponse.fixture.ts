import { INotesResponse } from "../gateways/mappers/INotesResponse";
import { deepFreeze } from "../utils";

export const notesResponseFixture = deepFreeze<INotesResponse>({
  meta: {
    count: 2,
  },
  data: [
    {
      type: "note",
      id: "bc6d7716-f8cd-469e-a701-10cac3775eb5",
      attributes: {
        beaconId: "8b0c56-77d3-42da-8d0a-48f987eeac4c",
        text: "That's a great beacon right there",
        type: "GENERAL",
        userId: "344848b9-8a5d-4818-a57d-1815528d543e",
        fullName: "Jean ValJean",
        email: "24601@jail.fr",
      },
      relationships: {},
    },
    {
      type: "note",
      id: "0f2b0eec-9e10-4a98-bd28-57cf2aab85e0",
      attributes: {
        beaconId: "8b0c56-77d3-42da-8d0a-48f987eeac4c",
        text: "That's not a great beacon right here",
        type: "INCIDENT",
        userId: "344848b9-8a5d-4818-a57d-1815528d543e",
        fullName: "Javert",
        email: "123456@france.fr",
      },
      relationships: {},
    },
  ],
  included: [],
});
