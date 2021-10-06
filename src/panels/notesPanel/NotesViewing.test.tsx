import { render, screen } from "@testing-library/react";
import { INote } from "../../entities/INote";
import { notesFixture } from "../../fixtures/notes.fixture";
import { formatMonth } from "../../utils/dateTime";
import { noNotesMessage, NotesViewing } from "./NotesViewing";

describe("NotesViewing", () => {
  it("should display the notes of a record", async () => {
    render(<NotesViewing notes={notesFixture as INote[]} />);

    for (const note of notesFixture) {
      expect(
        await screen.findByText(formatMonth(note.createdDate))
      ).toBeVisible();
      expect(await screen.findByText(new RegExp(note.type, "i"))).toBeVisible();
      expect(await screen.findByText(note.text)).toBeVisible();
      expect(await screen.findByText(note.fullName)).toBeVisible();
    }
  });

  it("displays the noNotesMessage if there are no notes for a record", async () => {
    render(<NotesViewing notes={[]} />);

    expect(await screen.findByText(noNotesMessage)).toBeVisible();
  });
});
