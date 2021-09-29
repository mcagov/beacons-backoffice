import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { notesFixture } from "../../fixtures/notes.fixture";
import { INotesGateway } from "../../gateways/notes/INotesGateway";
import { formatMonth } from "../../utils/dateTime";
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

    const noteRadioButton = await screen.getByTestId(/general-note-type/i);

    expect(await screen.findByText(/add a note/i)).toBeVisible();
    await waitFor(() => {
      userEvent.click(noteRadioButton);
    });

    const noteInputField = await screen.getByTestId(/note-input-field/i);

    await waitFor(() => {
      userEvent.type(noteInputField, "This is a general note");
    });

    const cancelButton = await screen.getByTestId(/cancel/i);

    await waitFor(() => {
      userEvent.click(cancelButton);
    });

    expect(await screen.findByText(noNotesMessage)).toBeVisible();
  });

  it("allows me to submit a note", async () => {});
});
