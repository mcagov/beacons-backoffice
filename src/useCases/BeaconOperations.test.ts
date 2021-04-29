import { BeaconOperations } from "./BeaconOperations";
import { testSingleBeacon } from "../testData/testBeacons";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";

describe("beaconOperations", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(testSingleBeacon),
      getAllBeacons: jest.fn(),
    };
  });

  describe("getBeacon()", () => {
    it("calls the injected BeaconsGateway", () => {
      const beaconOperations = new BeaconOperations(beaconsGatewayDouble);

      beaconOperations.getBeacon(testSingleBeacon.id);

      expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalled();
    });

    it("retrieves a beacon by its id", async () => {
      const beaconOperations = new BeaconOperations(beaconsGatewayDouble);
      const beacon = beaconOperations.getBeacon(testSingleBeacon.id);

      await expect(beacon).resolves.toStrictEqual(testSingleBeacon);
    });

    it("returns a rejected promise if beacon ID not found", async () => {
      const beaconOperations = new BeaconOperations(beaconsGatewayDouble);
      beaconsGatewayDouble.getBeacon = jest.fn().mockImplementation(() => {
        throw ReferenceError();
      });

      const tryAndFindNonexistingBeacon = () =>
        beaconOperations.getBeacon("not a real id");

      await expect(tryAndFindNonexistingBeacon).rejects.toThrowError();
    });
  });
});
