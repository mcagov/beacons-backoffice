import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { INote, NoteType } from "../../entities/INote";
import { notesFixture } from "../../fixtures/notes.fixture";
import { INotesGateway } from "../../gateways/notes/INotesGateway";
import { formatMonth } from "../../utils/dateTime";
import { Placeholders } from "../../utils/writingStyle";
import { noNotesMessage, NotesPanel } from "./NotesPanel";

describe("NotesPanel", () => {
  let gateway: INotesGateway;
  let beaconId: string;
  it("should display the notes of a record", async () => {
    gateway = {
      getNotes: jest.fn().mockResolvedValue(notesFixture),
      createNote: jest.fn(),
    };
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

    expect(await screen.findByText(/add a note/i)).toBeVisible();

    const noteRadioButton = screen.getByTestId(/incident-note-type/i);
    await waitFor(() => {
      userEvent.click(noteRadioButton);
    });

    const noteInputField = screen.getByTestId(/note-input-field/i);
    await waitFor(() => {
      userEvent.type(noteInputField, "This is a incident note");
    });

    const cancelButton = screen.getByTestId(/cancel/i);
    await waitFor(() => {
      userEvent.click(cancelButton);
    });

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
      createNote: jest.fn().mockResolvedValue(note),
    };

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    const noteRadioButton = await screen.getByTestId(/general-note-type/i);
    await waitFor(() => {
      userEvent.click(noteRadioButton);
    });

    const noteInputField = await screen.getByTestId(/note-input-field/i);
    await userEvent.type(noteInputField, note.text);

    const saveButton = await screen.getByTestId(/save/i);
    await waitFor(() => {
      userEvent.click(saveButton);
    });

    expect(await screen.findByText("MCA / MCC Notes")).toBeVisible();

    expect(await screen.findByText(note.text)).toBeVisible();
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
      createNote: jest.fn().mockResolvedValue(note),
    };

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    const addNoteButton = await screen.findByText(/add a new note/i);
    userEvent.click(addNoteButton);

    const noteRadioButton = await screen.getByTestId(/incident-note-type/i);
    await waitFor(() => {
      userEvent.click(noteRadioButton);
    });

    const noteInputField = await screen.getByTestId(/note-input-field/i);
    await userEvent.type(noteInputField, note.text);

    const saveButton = await screen.getByTestId(/save/i);
    await waitFor(() => {
      userEvent.click(saveButton);
    });

    expect(await screen.findByText("MCA / MCC Notes")).toBeVisible();

    expect(await screen.findByText(note.text)).toBeVisible();
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
});
