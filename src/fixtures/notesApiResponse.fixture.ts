import { INotesResponse } from "gateways/notes/INotesResponse";
import { deepFreeze } from "../utils";

export const twoNotesApiResponseFixture: INotesResponse = deepFreeze({
  meta: {},
  data: [
    {
      type: "note",
      id: "a00036c4-e3f4-46bb-aa9e-1d91870d9172",
      attributes: {
        text: "the text of a note",
        type: "GENERAL",
        createdDate: "2018-06-08T00:00",
        userId: "8572e782-2f50-40bc-9ea3-1e2e6bd04fd3",
        fullName: "mr note taker",
        email: "noteEmail@an-email.com",
      },
      links: [],
      relationships: {},
    },
    {
      type: "note",
      id: "b00036c4-e3f4-46bb-aa9e-1d91870d9173",
      attributes: {
        text: "the text of a note",
        type: "INCIDENT",
        createdDate: "2018-06-08T00:00",
        userId: "8572e782-2f50-40bc-9ea3-1e2e6bd04fd3",
        fullName: "mr note taker",
        email: "noteEmail@an-email.com",
      },
      links: [],
      relationships: {},
    },
  ],
  included: [],
});
