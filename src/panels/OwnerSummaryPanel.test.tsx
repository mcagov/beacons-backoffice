import { render, screen } from "@testing-library/react";
import { beaconFixture } from "fixtures/beacons.fixture";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { OwnerSummaryPanel } from "./OwnerSummaryPanel";

describe("Owner Summary Panel", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(beaconFixture),
      getAllBeacons: jest.fn(),
    };
  });

  it("should display the owners details", async () => {
    render(
      <OwnerSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    expect(await screen.findByText(/Steve Stevington/i)).toBeVisible();
  });
});
