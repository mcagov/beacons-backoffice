import axios from "axios";
import { usesFixture } from "fixtures/uses.fixture";
import { applicationConfig } from "../config";
import { IUsesGateway } from "./IUsesGateway";
import { IBeaconResponseMapper } from "./mappers/BeaconResponseMapper";
import { UsesGateway } from "./UsesGateway";

jest.mock("axios");
jest.useFakeTimers();

describe("UsesGateway", () => {
  let gateway: IUsesGateway;
  let beaconId: string;
  let beaconResponseMapper: IBeaconResponseMapper;

  beforeEach(() => {
    beaconResponseMapper = {
      map: jest.fn(),
    };
    gateway = new UsesGateway(beaconResponseMapper);
    beaconId = "f48e8212-2e10-4154-95c7-bdfd061bcfd2";
  });

  describe("fetching uses for a given beacon id", () => {
    it("returns the uses array", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
      beaconResponseMapper.map = jest
        .fn()
        .mockReturnValue({ uses: usesFixture });

      const uses = await gateway.getUses(beaconId);

      expect(uses).toStrictEqual(usesFixture);
    });

    it("queries the correct endpoint", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
      beaconResponseMapper.map = jest.fn().mockReturnValue({ uses: [] });

      await gateway.getUses(beaconId);

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons/${beaconId}`,
        expect.anything()
      );
    });

    it("handles errors", async () => {
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.getUses(beaconId)).rejects.toThrow();
    });
  });
});
