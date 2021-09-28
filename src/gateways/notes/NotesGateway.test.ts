import axios from "axios";
import { applicationConfig } from "../../config";
import { createNoteRequestFixture } from "../../fixtures/createNoteRequest.fixture";
import { createNoteResponseFixture } from "../../fixtures/createNoteResponse.fixture";
import { notesFixture } from "../../fixtures/notes.fixture";
import { notesResponseFixture } from "../../fixtures/notesResponse.fixture";
import { IAuthGateway } from "../auth/IAuthGateway";
import {
  INotesRequestMapper,
  NotesRequestMapper,
} from "../mappers/NotesRequestMapper";
import {
  INotesResponseMapper,
  NotesResponseMapper,
} from "../mappers/NotesResponseMapper";
import { INotesGateway } from "./INotesGateway";
import { NotesGateway } from "./NotesGateway";

jest.mock("axios");
describe("NotesGateway", () => {
  let gateway: INotesGateway;
  let beaconId: string;
  let notesResponseMapper: INotesResponseMapper;
  let notesRequestMapper: INotesRequestMapper;
  let authGateway: IAuthGateway;
  let accessToken: string;
  let config: any;

  beforeEach(() => {
    notesResponseMapper = new NotesResponseMapper();
    notesRequestMapper = new NotesRequestMapper();
    accessToken = "knock knock";
    authGateway = {
      getAccessToken: jest.fn().mockResolvedValue(accessToken),
    };
    gateway = new NotesGateway(
      notesResponseMapper,
      notesRequestMapper,
      authGateway
    );
    beaconId = "de8b0c56-77d3-42da-8d0a-48f987eeac4c";
    config = {
      timeout: applicationConfig.apiTimeoutMs,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
  });

  describe("getNotes", () => {
    it("queries the correct endpoint", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      await gateway.getNotes(beaconId);

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons/${beaconId}/notes`,
        config
      );
    });

    it("maps and returns a list of notes", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: notesResponseFixture })
      );

      const notes = await gateway.getNotes(beaconId);

      expect(notes).toStrictEqual(notesFixture);
    });

    it("throws errors", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.getNotes(beaconId)).rejects.toThrow();
    });
  });

  describe("createNote", () => {
    it("sends a POST request to the correct endpoint", async () => {
      notesRequestMapper.map = jest
        .fn()
        .mockReturnValue(createNoteRequestFixture);
      // @ts-ignore
      axios.post.mockImplementationOnce(() =>
        Promise.resolve({ data: createNoteResponseFixture })
      );
      const note = notesFixture[0];

      await gateway.createNote(note);

      expect(axios.post).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/note`,
        createNoteRequestFixture,
        config
      );
    });

    it("calls its request mapper to translate a Note to a INoteRequest", async () => {
      notesRequestMapper.map = jest.fn();
      // @ts-ignore
      axios.post.mockImplementationOnce(() =>
        Promise.resolve({ data: createNoteResponseFixture })
      );
      const note = notesFixture[0];

      await gateway.createNote(note);

      expect(notesRequestMapper.map).toHaveBeenCalledWith(note);
    });

    it("calls its response mapper to translate a INoteResponse to a INote", async () => {
      notesResponseMapper.map = jest.fn();
      // @ts-ignore
      axios.post.mockImplementationOnce(() =>
        Promise.resolve({ data: createNoteResponseFixture })
      );
      const note = notesFixture[0];

      await gateway.createNote(note);

      expect(notesResponseMapper.map).toHaveBeenCalledWith(
        createNoteResponseFixture
      );
    });

    it("throws errors", async () => {
      const note = notesFixture[0];

      // @ts-ignore
      axios.post.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.createNote(note)).rejects.toThrow();
    });
  });
});
