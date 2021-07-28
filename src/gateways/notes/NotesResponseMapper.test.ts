import { INote } from "entities/INote";
import { notesFixture } from "fixtures/notes.fixture";
import * as _ from "lodash";
import { twoNotesApiResponseFixture } from "../../fixtures/notesApiResponse.fixture";
import { INotesResponse } from "./INotesResponse";
import { NotesResponseMapper } from "./NotesResponseMapper";

describe("NotesResponseMapper", () => {
  let response: INotesResponse;
  let expectedNotes: INote[];

  beforeEach(() => {
    response = _.cloneDeep(twoNotesApiResponseFixture);
    expectedNotes = _.cloneDeep(notesFixture);
  });

  it("maps a API response payload to an array of INote", () => {
    const responseMapper = new NotesResponseMapper();

    const mappedBeacon = responseMapper.map(response);

    expect(mappedBeacon).toStrictEqual(expectedNotes);
  });

  it("replaces undefined values with empty strings", () => {
    response.data[0].attributes.email = undefined;
    response.data[0].attributes.createdDate = undefined;
    expectedNotes[0].email = "";
    expectedNotes[0].createdDate = "";
    const responseMapper = new NotesResponseMapper();

    const mappedResponse = responseMapper.map(response);

    expect(mappedResponse).toStrictEqual(expectedNotes);
  });
});
