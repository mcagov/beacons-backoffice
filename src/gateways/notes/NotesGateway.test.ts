import axios from "axios";
import { applicationConfig } from "../../config";
import { notesFixture } from "../../fixtures/notes.fixture";
import { notesResponseFixture } from "../../fixtures/notesResponse.fixture";
import { IAuthGateway } from "../auth/IAuthGateway";
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
  let authGateway: IAuthGateway;
  let accessToken: string;
  let config: any;

  beforeEach(() => {
    notesResponseMapper = new NotesResponseMapper();
    accessToken = "knock knock";
    authGateway = {
      getAccessToken: jest.fn().mockResolvedValue(accessToken),
    };
    gateway = new NotesGateway(notesResponseMapper, authGateway);
    beaconId = "de8b0c56-77d3-42da-8d0a-48f987eeac4c";
    config = {
      timeout: applicationConfig.apiTimeoutMs,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
  });

  describe("NotesGateway", () => {
    it.only("queries the correct endpoint", async () => {
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
});
