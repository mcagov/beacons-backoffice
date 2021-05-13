import axios from "axios";
import { applicationConfig } from "../config";
import { IBeacon } from "../entities/IBeacon";
import { beaconFixture } from "../fixtures/beacons.fixture";
import { BeaconsGateway } from "./BeaconsGateway";
import { IBeaconResponseMapper } from "./mappers/BeaconResponseMapper";

jest.mock("axios");
jest.useFakeTimers();

afterEach(() => {
  jest.clearAllMocks();
});

describe("BeaconsGateway", () => {
  const beaconResponseMapper: IBeaconResponseMapper = {
    map: jest.fn(),
  };

  describe("getAllBeacons()", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("queries the correct endpoint", () => {
      const gateway = new BeaconsGateway(beaconResponseMapper);
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      gateway.getAllBeacons();

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons`,
        expect.anything()
      );
    });

    it("handles errors", async () => {
      const gateway = new BeaconsGateway(beaconResponseMapper);

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
      const gateway = new BeaconsGateway(beaconResponseMapper);
      const beaconId = "f48e8212-2e10-4154-95c7-bdfd061bcfd2";
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      gateway.getBeacon(beaconId);

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons/${beaconId}`,
        expect.anything()
      );
    });

    it("handles errors", async () => {
      const gateway = new BeaconsGateway(beaconResponseMapper);

      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.getAllBeacons()).rejects.toThrow();
    });
  });

  describe("updateBeacon()", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("sends a PATCH request to the correct endpoint", () => {
      const gateway = new BeaconsGateway(beaconResponseMapper);
      const updatedFieldsOnly: Partial<IBeacon> = { manufacturer: "ACME Inc." };
      // @ts-ignore
      axios.patch.mockResolvedValue({ status: 200 });

      gateway.updateBeacon(beaconFixture.id, updatedFieldsOnly);

      expect(axios.patch).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons/${beaconFixture.id}`,
        updatedFieldsOnly
      );
    });

    it("handles errors", async () => {
      const gateway = new BeaconsGateway(beaconResponseMapper);
      // @ts-ignore
      axios.patch.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(
        gateway.updateBeacon(beaconFixture.id, { model: "iBeacon" })
      ).rejects.toThrow();
    });
  });
});
