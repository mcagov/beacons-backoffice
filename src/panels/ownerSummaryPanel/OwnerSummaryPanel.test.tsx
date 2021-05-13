import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beaconFixture } from "fixtures/beacons.fixture";
import { IBeaconsGateway } from "../../gateways/IBeaconsGateway";
import { Placeholders } from "../../utils/writingStyle";
import { OwnerSummaryPanel } from "./OwnerSummaryPanel";

describe("Owner Summary Panel", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(beaconFixture),
      getAllBeacons: jest.fn(),
      updateBeacon: jest.fn(),
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

  it("calls the injected BeaconsGateway", async () => {
    render(
      <OwnerSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    await waitFor(() => {
      expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalled();
    });
  });

  it("retrieves the owner data by beacon id and displays it", async () => {
    render(
      <OwnerSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
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
      <OwnerSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={"doesn't exist"}
      />
    );

    expect(await screen.findByRole("alert")).toBeVisible();
    expect(
      await screen.findByText(Placeholders.UnspecifiedError)
    ).toBeVisible();
  });

  it("fetches beacon data on state change", async () => {
    render(
      <OwnerSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );
    expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalledTimes(1);

    const editButton = await screen.findByText(/edit owner/i);
    userEvent.click(editButton);
    expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalledTimes(2);

    const cancelButton = await screen.findByRole("button", {
      name: "Cancel",
    });
    userEvent.click(cancelButton);
    expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalledTimes(3);
  });
});
