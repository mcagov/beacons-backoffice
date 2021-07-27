import axios from "axios";
import { notesFixture } from "fixtures/notes.fixture";
import { applicationConfig } from "../../config";
import { IAuthGateway } from "../auth/IAuthGateway";
import { NotesGateway } from "./NotesGateway";

jest.mock("axios");
jest.useFakeTimers();

describe("NotesGateway", () => {
  let beaconId: string;
  let accessToken: string;
  let authGateway: IAuthGateway;
  let config: any;

  beforeEach(() => {
    accessToken = "LET.ME.IN";
    authGateway = {
      getAccessToken: jest.fn().mockResolvedValue(accessToken),
    };
    config = {
      timeout: applicationConfig.apiTimeoutMs,
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    beaconId = "f48e8212-2e10-4154-95c7-bdfd061bcfd2";
  });

  describe("fetching notes for a given beacon id", () => {
    it("returns the notes array", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
      var responseMapper = {
        map: jest.fn().mockReturnValue(notesFixture),
      };
      var gateway = new NotesGateway(authGateway, responseMapper);

      const notes = await gateway.getNotes(beaconId);

      expect(notes).toStrictEqual(notesFixture);
    });

    it("queries the correct endpoint", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      var responseMapper = {
        map: jest.fn(),
      };
      var gateway = new NotesGateway(authGateway, responseMapper);
      await gateway.getNotes(beaconId);

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons/${beaconId}/notes`,
        config
      );
    });

    it("handles errors", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      var responseMapper = {
        map: jest.fn().mockReturnValue({ uses: notesFixture }),
      };
      var gateway = new NotesGateway(authGateway, responseMapper);
      await expect(gateway.getNotes(beaconId)).rejects.toThrow();
    });
  });
});
