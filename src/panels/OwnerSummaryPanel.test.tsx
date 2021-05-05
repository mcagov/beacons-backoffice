import { render, screen } from "@testing-library/react";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { testSingleBeacon } from "../testData/testBeacons";
import { OwnerSummaryPanel } from "./OwnerSummaryPanel";

describe("Owner Summary Panel", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(testSingleBeacon),
      getAllBeacons: jest.fn(),
    };
  });

  it("should display the owners details", async () => {
    render(
      <OwnerSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={testSingleBeacon.id}
      />
    );

    expect(await screen.findByText(/Steve Stevington/i)).toBeInTheDocument();
  });
});
