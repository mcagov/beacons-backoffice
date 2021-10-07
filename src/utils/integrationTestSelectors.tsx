import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { notesFixture } from "fixtures/notes.fixture";
import { INotesGateway } from "gateways/notes/INotesGateway";
import { NotesPanel } from "panels/notesPanel/NotesPanel";

export const whenNotesPanelIsRendered = (
  gateway: INotesGateway,
  beaconId: string
) => {
  render(<NotesPanel notesGateway={gateway} beaconId={beaconId} />);
};

export const iShouldSeeText = async (text: string) => {
  expect(await screen.findByText(text)).toBeVisible();
};

export const whenIClickButtonFoundByText = async (
  buttonText: string | RegExp
) => {
  const button = await screen.findByText(buttonText);
  userEvent.click(button);
};

export const whenIClickButtonFoundByTestId = async (
  testIdText: string | RegExp
) => {
  const button = await screen.findByTestId(testIdText);
  userEvent.click(button);
};

export const whenITypeInInputFoundByPlaceholder = async (
  placeholderText: string
) => {
  const noteInputField = await screen.findByPlaceholderText(placeholderText);
  userEvent.type(noteInputField, notesFixture[0].text);
};
