import { screen } from "@testing-library/react";
import { makeServer } from "server";
import {
  iShouldSeeText,
  whenIClickButtonFoundByTestId,
  whenIClickButtonFoundByText,
  whenITypeInInputFoundByPlaceholder,
  whenNotesPanelIsRendered,
} from "utils/integrationTestSelectors";
import { v4 } from "uuid";
import { notesFixture } from "../../fixtures/notes.fixture";
import { IAuthGateway } from "../../gateways/auth/IAuthGateway";
import { INotesGateway } from "../../gateways/notes/INotesGateway";
import { NotesGateway } from "../../gateways/notes/NotesGateway";
import { noNotesMessage } from "./NotesViewing";

describe("NotesPanel", () => {
  let authGateway: IAuthGateway;
  let gateway: INotesGateway;
  let beaconId: string;

  let server: any;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    authGateway = {
      getAccessToken: jest.fn().mockResolvedValue("Test access token"),
    };
    gateway = new NotesGateway(authGateway);
    beaconId = v4();
  });

  afterEach(() => {
    server.shutdown();
  });

  it("notes integration test", async () => {
    // displays a message if there are no notes for a record
    whenNotesPanelIsRendered(gateway, beaconId);

    iShouldSeeText(noNotesMessage);

    // adds a general note
    whenIClickButtonFoundByText(/add a new note/i);

    whenIClickButtonFoundByTestId(/general-note-type/i);

    whenITypeInInputFoundByPlaceholder("Add a note here");

    whenIClickButtonFoundByTestId(/save/i);

    iShouldSeeText("MCA / MCC Notes");

    iShouldSeeText(notesFixture[0].createdDate);

    iShouldSeeText(notesFixture[0].type);

    iShouldSeeText(notesFixture[0].text);

    iShouldSeeText(notesFixture[0].fullName);

    // allows me to submit an incident note

    whenIClickButtonFoundByText(/add a new note/i);

    whenIClickButtonFoundByTestId(/incident-note-type/i);

    whenITypeInInputFoundByPlaceholder("Add a note here");

    whenIClickButtonFoundByTestId(/save/i);

    iShouldSeeText("MCA / MCC Notes");

    iShouldSeeText(notesFixture[1].createdDate);

    iShouldSeeText(notesFixture[1].type);

    iShouldSeeText(notesFixture[1].text);

    iShouldSeeText(notesFixture[1].fullName);

    // shouldn't let the user submit the form if at least one field is empty

    whenIClickButtonFoundByText(/add a new note/i);

    whenIClickButtonFoundByTestId(/incident-note-type/i);

    expect(await screen.findByTestId(/save/i)).toBeDisabled();
  });
});
