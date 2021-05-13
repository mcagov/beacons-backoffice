import axios from "axios";
import { applicationConfig } from "../config";
import { IBeacon } from "../entities/IBeacon";
import { beaconFixture } from "../fixtures/beacons.fixture";
import { singleBeaconApiResponseFixture } from "../fixtures/singleBeaconApiResponse.fixture";
import { BeaconsGateway } from "./BeaconsGateway";
import { IBeaconRequestMapper } from "./mappers/BeaconRequestMapper";
import { IBeaconResponseMapper } from "./mappers/BeaconResponseMapper";

jest.mock("axios");
jest.useFakeTimers();

describe("BeaconsGateway", () => {
  const beaconResponseMapper: IBeaconResponseMapper = {
    map: jest.fn(),
  };

  const beaconRequestMapper: IBeaconRequestMapper = {
    map: jest.fn(),
  };

  describe("getAllBeacons()", () => {
    it("queries the correct endpoint", () => {
      const gateway = new BeaconsGateway(
        beaconResponseMapper,
        beaconRequestMapper
      );
      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));

      gateway.getAllBeacons();

      expect(axios.get).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons`,
        expect.anything()
      );
    });

    it("handles errors", async () => {
      const gateway = new BeaconsGateway(
        beaconResponseMapper,
        beaconRequestMapper
      );

      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.getAllBeacons()).rejects.toThrow();
    });
  });

  describe("getBeacon()", () => {
    it("queries the correct endpoint", () => {
      const gateway = new BeaconsGateway(
        beaconResponseMapper,
        beaconRequestMapper
      );
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
      const gateway = new BeaconsGateway(
        beaconResponseMapper,
        beaconRequestMapper
      );

      // @ts-ignore
      axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(gateway.getAllBeacons()).rejects.toThrow();
    });

    it("calls its mapper to translate the API response to a domain object", async () => {
      const gateway = new BeaconsGateway(
        beaconResponseMapper,
        beaconRequestMapper
      );
      const beaconId = "f48e8212-2e10-4154-95c7-bdfd061bcfd2";
      // @ts-ignore
      axios.get.mockImplementation(() =>
        Promise.resolve(singleBeaconApiResponseFixture)
      );

      await gateway.getBeacon(beaconId);

      expect(beaconResponseMapper.map).toHaveBeenCalledWith(
        singleBeaconApiResponseFixture.data
      );
    });
  });

  describe("updateBeacon()", () => {
    const updateBeaconRequest = {
      data: {
        type: "beacon",
        id: beaconFixture.id,
        attributes: {
          manufacturer: "ACME Inc.",
        },
      },
    };

    const updateBeaconResponse = {
      meta: {},
      included: [],
      data: {
        type: "beacon",
        id: beaconFixture.id,
        attributes: {
          hexId: beaconFixture.hexId,
          status: beaconFixture.status,
          type: beaconFixture.type,
          manufacturer: "ACME Inc.",
          createdDate: beaconFixture.registeredDate,
          model: beaconFixture.model,
          manufacturerSerialNumber: beaconFixture.manufacturerSerialNumber,
          chkCode: beaconFixture.chkCode,
          protocolCode: beaconFixture.protocolCode,
          batteryExpiryDate: beaconFixture.batteryExpiryDate,
          lastServicedDate: beaconFixture.lastServicedDate,
        },
        relationships: {
          uses: {
            data: [],
          },
          owner: {
            data: [],
          },
          emergencyContacts: {
            data: [],
          },
        },
      },
    };

    it("sends a PATCH request to the correct endpoint", () => {
      beaconRequestMapper.map = jest.fn().mockReturnValue(updateBeaconRequest);
      const gateway = new BeaconsGateway(
        beaconResponseMapper,
        beaconRequestMapper
      );
      const updatedFieldsOnly: Partial<IBeacon> = { manufacturer: "ACME Inc." };
      // @ts-ignore
      axios.patch.mockResolvedValue({ status: 200, updateBeaconResponse });

      gateway.updateBeacon(beaconFixture.id, updatedFieldsOnly);

      expect(axios.patch).toHaveBeenCalledWith(
        `${applicationConfig.apiUrl}/beacons/${beaconFixture.id}`,
        updateBeaconRequest
      );
    });

    it("calls its mapper to translate the domain object to a valid API request", () => {
      const gateway = new BeaconsGateway(
        beaconResponseMapper,
        beaconRequestMapper
      );
      const updatedFieldsOnly: Partial<IBeacon> = { manufacturer: "ACME Inc." };
      // @ts-ignore
      axios.patch.mockResolvedValue({
        status: 200,
        data: updateBeaconResponse,
      });

      gateway.updateBeacon(beaconFixture.id, updatedFieldsOnly);

      expect(beaconRequestMapper.map).toHaveBeenCalledWith(
        beaconFixture.id,
        updatedFieldsOnly
      );
    });

    it("handles errors", async () => {
      const gateway = new BeaconsGateway(
        beaconResponseMapper,
        beaconRequestMapper
      );
      // @ts-ignore
      axios.patch.mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(
        gateway.updateBeacon(beaconFixture.id, { model: "iBeacon" })
      ).rejects.toThrow();
    });
  });
});
