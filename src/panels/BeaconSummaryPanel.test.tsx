import { render, screen, waitFor } from "@testing-library/react";
import { beaconFixture } from "../fixtures/beacons.fixture";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { Placeholders } from "../useCases/mcaWritingStyleFormatter";
import { BeaconSummaryPanel } from "./BeaconSummaryPanel";

describe("BeaconSummaryPanel", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(beaconFixture),
      getAllBeacons: jest.fn(),
    };
  });

  it("calls the injected BeaconsGateway", async () => {
    render(
      <BeaconSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
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
        beaconId={beaconFixture.id}
      />
    );

    expect(
      await screen.findByText(beaconFixture.protocolCode as string)
    ).toBeVisible();
  });

  it("displays an error if beacon lookup fails for any reason", async () => {
    beaconsGatewayDouble.getBeacon = jest.fn().mockImplementation(() => {
      throw Error();
    });
    jest.spyOn(console, "error").mockImplementation(() => {}); // Avoid console error failing test
    render(
      <BeaconSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={"doesn't exist"}
      />
    );

    expect(await screen.findByRole("alert")).toBeVisible();
    expect(await screen.findByText("An error occurred")).toBeVisible();
  });

  it("displays undefined fields as 'NO DATA ENTERED'", async () => {
    const beaconWithUndefinedField = {
      ...beaconFixture,
      protocolCode: undefined,
    };
    beaconsGatewayDouble.getBeacon = jest
      .fn()
      .mockResolvedValue(beaconWithUndefinedField);

    render(
      <BeaconSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    expect(await screen.findByText(Placeholders.NoData)).toBeVisible();
  });
});
