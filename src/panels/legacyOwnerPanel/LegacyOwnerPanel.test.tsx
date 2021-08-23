import { render, screen, waitFor } from "@testing-library/react";
import { legacyBeaconFixture } from "fixtures/legacybeacons.fixture";
import { IBeaconsGateway } from "../../gateways/beacons/IBeaconsGateway";
import { Placeholders } from "../../utils/writingStyle";
import { LegacyOwnerPanel } from "./LegacyOwnerPanel";

describe("Owner Summary Panel", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn(),
      getLegacyBeacon: jest.fn().mockResolvedValue(legacyBeaconFixture),
      getAllBeacons: jest.fn(),
      updateBeacon: jest.fn(),
    };
  });

  it("should display the owners details", async () => {
    render(
      <LegacyOwnerPanel
        legacyOwner={legacyBeaconFixture.owner}
        secondaryLegacyOwners={legacyBeaconFixture.secondaryOwners}
      />
    );

    expect(await screen.findByText(/Steve Stevington/i)).toBeVisible();
  });

  it("calls the injected BeaconsGateway", async () => {
    render(
      <LegacyOwnerPanel
        legacyOwner={legacyBeaconFixture.owner}
        secondaryLegacyOwners={legacyBeaconFixture.secondaryOwners}
      />
    );

    await waitFor(() => {
      expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalled();
    });
  });

  it("retrieves the owner data by beacon id and displays it", async () => {
    render(
      <LegacyOwnerPanel
        legacyOwner={legacyBeaconFixture.owner}
        secondaryLegacyOwners={legacyBeaconFixture.secondaryOwners}
      />
    );

    expect(await screen.findByText(/Steve Stevington/i)).toBeVisible();
  });

  it("displays an error if beacon lookup fails for any reason", async () => {
    beaconsGatewayDouble.getBeacon = jest.fn().mockImplementation(() => {
      throw Error();
    });
    jest.spyOn(console, "error").mockImplementation(() => {}); // Avoid console error failing test
    render(
      <LegacyOwnerPanel
        legacyOwner={legacyBeaconFixture.owner}
        secondaryLegacyOwners={legacyBeaconFixture.secondaryOwners}
      />
    );

    expect(await screen.findByRole("alert")).toBeVisible();
    expect(
      await screen.findByText(Placeholders.UnspecifiedError)
    ).toBeVisible();
  });
});
