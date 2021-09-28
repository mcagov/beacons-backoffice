import { render, screen } from "@testing-library/react";
import { notesFixture } from "../../fixtures/notes.fixture";
import { INotesGateway } from "../../gateways/notes/INotesGateway";
import { formatMonth } from "../../utils/dateTime";
import { NoNotesMessage, NotesPanel } from "./NotesPanel";

describe("NotesPanel", () => {
  let gateway: INotesGateway;
  let beaconId: string;
  it("should display the notes of a record", async () => {
    gateway = {
      getNotes: jest.fn().mockResolvedValue(notesFixture),
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
    gateway = { getNotes: jest.fn().mockResolvedValue([]) };
    beaconId = "24601";

    render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);

    expect(await screen.findByText(NoNotesMessage)).toBeVisible();
  });
});