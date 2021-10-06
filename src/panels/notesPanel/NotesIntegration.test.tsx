import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { makeServer } from "server";
import { v4 } from "uuid";
import { notesFixture } from "../../fixtures/notes.fixture";
import { IAuthGateway } from "../../gateways/auth/IAuthGateway";
import {
  INotesRequestMapper,
  NotesRequestMapper,
} from "../../gateways/mappers/NotesRequestMapper";
import {
  INotesResponseMapper,
  NotesResponseMapper,
} from "../../gateways/mappers/NotesResponseMapper";
import { INotesGateway } from "../../gateways/notes/INotesGateway";
import { NotesGateway } from "../../gateways/notes/NotesGateway";
import { formatMonth } from "../../utils/dateTime";
import { titleCase } from "../../utils/writingStyle";
import { NotesPanel } from "./NotesPanel";
import { noNotesMessage } from "./NotesViewing";

describe("NotesPanel", () => {
  let notesResponseMapper: INotesResponseMapper;
  let notesRequestMapper: INotesRequestMapper;
  let authGateway: IAuthGateway;
  let gateway: INotesGateway;
  let beaconId: string;

  let server: any;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    notesResponseMapper = new NotesResponseMapper();
    notesRequestMapper = new NotesRequestMapper();
    authGateway = {
      getAccessToken: jest.fn().mockResolvedValue("Test access token"),
    };
    gateway = new NotesGateway(
      notesResponseMapper,
      notesRequestMapper,
      authGateway
    );
    beaconId = v4();
  });

  afterEach(() => {
    server.shutdown();
  });

  it("displays a message if there are no notes for a record", async () => {
    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    expect(await screen.findByText(noNotesMessage)).toBeVisible();
  });

  it("allows me to submit a general note", async () => {
    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    await waitFor(() => {
      const noteRadioButton = screen.getByTestId(/general-note-type/i);
      userEvent.click(noteRadioButton);
    });

    await waitFor(() => {
      const noteInputField = screen.getByPlaceholderText("Add a note here");
      userEvent.type(noteInputField, notesFixture[0].text);
    });

    await waitFor(() => {
      const saveButton = screen.getByTestId(/save/i);
      userEvent.click(saveButton);
    });

    expect(await screen.findByText("MCA / MCC Notes")).toBeVisible();
    expect(
      await screen.findByText(formatMonth(notesFixture[0].createdDate))
    ).toBeVisible();
    expect(
      await screen.findByText(titleCase(notesFixture[0].type))
    ).toBeVisible();
    expect(await screen.findByText(notesFixture[0].text)).toBeVisible();
    expect(await screen.findByText(notesFixture[0].fullName)).toBeVisible();
  });

  it("allows me to submit an incident note", async () => {
    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    await waitFor(() => {
      const noteRadioButton = screen.getByTestId(/incident-note-type/i);
      userEvent.click(noteRadioButton);
    });

    await waitFor(() => {
      const noteInputField = screen.getByPlaceholderText("Add a note here");
      userEvent.type(noteInputField, notesFixture[1].text);
    });

    const saveButton = screen.getByTestId(/save/i);
    await waitFor(() => {
      userEvent.click(saveButton);
    });

    expect(await screen.findByText("MCA / MCC Notes")).toBeVisible();
    expect(
      await screen.findByText(formatMonth(notesFixture[1].createdDate))
    ).toBeVisible();
    expect(
      await screen.findByText(titleCase(notesFixture[1].type))
    ).toBeVisible();
    expect(await screen.findByText(notesFixture[1].text)).toBeVisible();
    expect(await screen.findByText(notesFixture[1].fullName)).toBeVisible();
  });

  it("shouldn't let the user submit the form if at least one field is empty", async () => {
    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    await waitFor(() => {
      screen.getByTestId(/incident-note-type/i);
    });

    expect(screen.getByTestId(/save/i)).toBeDisabled();
  });
});
