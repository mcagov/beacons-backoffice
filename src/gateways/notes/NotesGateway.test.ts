import axios from "axios";
import { notesFixture } from "fixtures/notes.fixture";
import { applicationConfig } from "../../config";
import { IAuthGateway } from "../auth/IAuthGateway";
import { INotesGateway } from "./INotesGateway";
import { NotesGateway } from "./NotesGateway";

jest.mock("axios");
jest.useFakeTimers();

describe("NotesGateway", () => {
  let gateway: INotesGateway;
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
    gateway = new NotesGateway(authGateway);
    beaconId = "f48e8212-2e10-4154-95c7-bdfd061bcfd2";
  });

  describe("fetching notes for a given beacon id", () => {
    it("returns the notes array", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
      beaconResponseMapper.map = jest
        .fn()
        .mockReturnValue({ uses: notesFixture });

      const uses = await gateway.getNotes(beaconId);

      expect(uses).toStrictEqual(notesFixture);
    });

    it("queries the correct endpoint", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      await gateway.getNotes(beaconId);

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons/${beaconId}/notes`,
        config
      );
    });

    it("handles errors", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.getNotes(beaconId)).rejects.toThrow();
    });
  });
});
