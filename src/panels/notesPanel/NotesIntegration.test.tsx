import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { INote, NoteType } from "../../entities/INote";
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
import { Placeholders, titleCase } from "../../utils/writingStyle";
import { NotesPanel } from "./NotesPanel";
import { noNotesMessage } from "./NotesViewing";

describe("NotesPanel", () => {
  let notesResponseMapper: INotesResponseMapper;
  let notesRequestMapper: INotesRequestMapper;
  let authGateway: IAuthGateway;
  let gateway: INotesGateway;
  let beaconId: string;

  it("should display the notes of a record", async () => {
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
    beaconId = "123445";

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    expect(await screen.findByText("MCA / MCC Notes")).toBeVisible();
    for (const note of notesFixture) {
      expect(
        await screen.findByText(formatMonth(note.createdDate))
      ).toBeVisible();
      expect(await screen.findByText(new RegExp(note.type, "i"))).toBeVisible();
      expect(await screen.findByText(note.text)).toBeVisible();
      expect(await screen.findByText(note.fullName)).toBeVisible();
    }
  });

  it("displays a message if there are no notes for a record", async () => {
    gateway.getNotes = jest.fn().mockResolvedValue([]);
    beaconId = "24601";

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    expect(await screen.findByText(noNotesMessage)).toBeVisible();
  });

  it("allows me to cancel adding a note", async () => {
    gateway.getNotes = jest.fn().mockResolvedValue([]);
    beaconId = "24601";

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    await waitFor(() => {
      const noteRadioButton = screen.getByTestId(/incident-note-type/i);
      userEvent.click(noteRadioButton);
    });

    const noteInputField = screen.getByTestId(/note-input-field/i);
    userEvent.type(noteInputField, "This is an incident note");

    const cancelButton = screen.getByTestId(/cancel/i);
    userEvent.click(cancelButton);

    expect(await screen.findByText(noNotesMessage)).toBeVisible();
  });

  it("allows me to submit a general note", async () => {
    beaconId = "24601";

    const note: INote = {
      id: "1234567",
      beaconId,
      text: "It is a beacon",
      type: NoteType.GENERAL,
      createdDate: "29/09/21",
      userId: "123890213",
      fullName: "Beacon McBeaconFace",
      email: "mcbeaconface@beacons.com",
    };

    gateway = {
      getNotes: jest.fn().mockResolvedValueOnce([]).mockResolvedValue([note]),
      createNote: jest.fn(),
    };

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    await waitFor(() => {
      const noteRadioButton = screen.getByTestId(/general-note-type/i);
      userEvent.click(noteRadioButton);
    });

    await waitFor(() => {
      const noteInputField = screen.getByPlaceholderText("Add a note here");
      userEvent.type(noteInputField, note.text);
    });

    await waitFor(() => {
      const saveButton = screen.getByTestId(/save/i);
      userEvent.click(saveButton);
    });

    expect(await screen.findByText("MCA / MCC Notes")).toBeVisible();
    expect(
      await screen.findByText(formatMonth(note.createdDate))
    ).toBeVisible();
    expect(await screen.findByText(titleCase(note.type))).toBeVisible();
    expect(await screen.findByText(note.text)).toBeVisible();
    expect(await screen.findByText(note.fullName)).toBeVisible();
  });

  it("allows me to submit an incident note", async () => {
    beaconId = "24601";

    const note: INote = {
      id: "1234567",
      beaconId,
      text: "It is a beacon",
      type: NoteType.INCIDENT,
      createdDate: "29/09/21",
      userId: "123890213",
      fullName: "Beacon McBeaconFace",
      email: "mcbeaconface@beacons.com",
    };

    gateway = {
      getNotes: jest.fn().mockResolvedValueOnce([]).mockResolvedValue([note]),
      createNote: jest.fn(),
    };

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    await waitFor(() => {
      const noteRadioButton = screen.getByTestId(/incident-note-type/i);
      userEvent.click(noteRadioButton);
    });

    await waitFor(() => {
      const noteInputField = screen.getByPlaceholderText("Add a note here");
      userEvent.type(noteInputField, note.text);
    });

    const saveButton = screen.getByTestId(/save/i);
    await waitFor(() => {
      userEvent.click(saveButton);
    });

    expect(await screen.findByText("MCA / MCC Notes")).toBeVisible();
    expect(
      await screen.findByText(formatMonth(note.createdDate))
    ).toBeVisible();
    expect(await screen.findByText(titleCase(note.type))).toBeVisible();
    expect(await screen.findByText(note.text)).toBeVisible();
    expect(await screen.findByText(note.fullName)).toBeVisible();
  });

  it("displays error if notes lookup fails for any reason", async () => {
    gateway.getNotes = jest.fn().mockImplementation(() => {
      throw Error();
    });
    jest.spyOn(console, "error").mockImplementation(() => {}); // Avoid console error failing test

    render(<NotesPanel notesGateway={gateway} beaconId={""} />);

    expect(await screen.findByRole("alert")).toBeVisible();
    expect(
      await screen.findByText(Placeholders.UnspecifiedError)
    ).toBeVisible();
  });

  it("shouldn't let the user submit the form if at least one field is empty", async () => {
    beaconId = "24601";

    const note: INote = {
      id: "1234567",
      beaconId,
      text: "It is a beacon",
      type: NoteType.INCIDENT,
      createdDate: "29/09/21",
      userId: "123890213",
      fullName: "Beacon McBeaconFace",
      email: "mcbeaconface@beacons.com",
    };

    gateway = {
      getNotes: jest.fn().mockResolvedValueOnce([]).mockResolvedValue([note]),
      createNote: jest.fn(),
    };

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    await waitFor(() => {
      screen.getByTestId(/incident-note-type/i);
    });

    expect(screen.getByTestId(/save/i)).toBeDisabled();
  });
});
