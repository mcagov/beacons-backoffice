import axios from "axios";
import { applicationConfig } from "../config";
import { BeaconsGateway } from "./BeaconsGateway";
import { IBeaconResponseTranslator } from "./translators/BeaconResponseTranslator";

jest.mock("axios");
jest.useFakeTimers();

describe("BeaconsGateway", () => {
  const beaconResponseTranslator: IBeaconResponseTranslator = {
    translate: jest.fn(),
  };

  describe("getAllBeacons()", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("queries the correct endpoint", () => {
      const gateway = new BeaconsGateway(beaconResponseTranslator);
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      gateway.getAllBeacons();

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons`,
        expect.anything()
      );
    });

    it("handles errors", async () => {
      const gateway = new BeaconsGateway(beaconResponseTranslator);

      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.getAllBeacons()).rejects.toThrow();
    });
  });

  describe("getBeacon()", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("queries the correct endpoint", () => {
      const gateway = new BeaconsGateway(beaconResponseTranslator);
      const beaconId = "f48e8212-2e10-4154-95c7-bdfd061bcfd2";
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      gateway.getBeacon(beaconId);

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacon/${beaconId}`,
        expect.anything()
      );
    });

    it("handles errors", async () => {
      const gateway = new BeaconsGateway(beaconResponseTranslator);

      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.getAllBeacons()).rejects.toThrow();
    });
  });
});
