import { INoteRequest } from "../gateways/mappers/INoteRequest";

export const createNoteRequestFixture: INoteRequest = {
  data: {
    type: "note",
    attributes: {
      beaconId: "8b0c56-77d3-42da-8d0a-48f987eeac4c",
      text: "That's a great beacon right there",
      type: "GENERAL",
    },
  },
};
