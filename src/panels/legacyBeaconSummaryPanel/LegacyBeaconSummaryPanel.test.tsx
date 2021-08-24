import { render, screen, waitFor } from "@testing-library/react";
import { legacyBeaconFixture } from "fixtures/legacybeacons.fixture";
import { beaconFixture } from "../../fixtures/beacons.fixture";
import { IBeaconsGateway } from "../../gateways/beacons/IBeaconsGateway";
import { Placeholders } from "../../utils/writingStyle";
import { LegacyBeaconSummaryPanel } from "./LegacyBeaconSummaryPanel";

describe("LegacyBeaconSummaryPanel", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(beaconFixture),
      getLegacyBeacon: jest.fn(),
      getAllBeacons: jest.fn(),
      updateBeacon: jest.fn(),
    };
  });

  it("calls the injected BeaconsGateway", async () => {
    render(<LegacyBeaconSummaryPanel legacyBeacon={legacyBeaconFixture} />);

    await waitFor(() => {
      expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalled();
    });
  });

  it("displays an error if beacon lookup fails for any reason", async () => {
    beaconsGatewayDouble.getBeacon = jest.fn().mockImplementation(() => {
      throw Error();
    });
    jest.spyOn(console, "error").mockImplementation(() => {}); // Avoid console error failing test
    render(<LegacyBeaconSummaryPanel legacyBeacon={legacyBeaconFixture} />);

    expect(await screen.findByRole("alert")).toBeVisible();
    expect(
      await screen.findByText(Placeholders.UnspecifiedError)
    ).toBeVisible();
  });
});
