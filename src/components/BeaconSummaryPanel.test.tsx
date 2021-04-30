import { render, screen, waitFor } from "@testing-library/react";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { testSingleBeacon } from "../testData/testBeacons";
import { BeaconSummaryPanel } from "./BeaconSummaryPanel";

describe("BeaconSummary", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(testSingleBeacon),
      getAllBeacons: jest.fn(),
    };
  });

  describe("BeaconSummary", () => {
    it("calls the injected BeaconsGateway", async () => {
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={testSingleBeacon.id}
        />
      );

      await waitFor(() => {
        expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalled();
      });
    });

    it("retrieves the beacon summary data by beacon id", async () => {
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={testSingleBeacon.id}
        />
      );

      expect(
        await screen.findByText(testSingleBeacon.protocolCode)
      ).toBeVisible();
    });

    it("displays an error if beacon ID is not found", async () => {
      beaconsGatewayDouble.getBeacon = jest.fn().mockImplementation(() => {
        throw ReferenceError("Beacon not found!");
      });
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={"doesn't exist"}
        />
      );

      expect(await screen.findByText("Beacon not found!")).toBeVisible();
    });

    it("displays undefined fields as 'NO DATA ENTERED'", async () => {
      const beaconWithUndefinedField = {
        ...testSingleBeacon,
        protocolCode: undefined,
      };
      beaconsGatewayDouble.getBeacon = jest
        .fn()
        .mockResolvedValue(beaconWithUndefinedField);

      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={testSingleBeacon.id}
        />
      );

      expect(await screen.findByText("NO DATA ENTERED")).toBeVisible();
    });
  });
});
