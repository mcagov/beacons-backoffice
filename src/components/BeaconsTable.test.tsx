import { render, screen, waitFor } from "@testing-library/react";
import { beaconsGatewayFixture } from "gateways/BeaconsGateway.fixture";
import { IBeaconsGateway } from "gateways/IBeaconsGateway";
import { BeaconsTable } from "./BeaconsTable";

describe("<BeaconsTable>", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getAllBeacons: jest.fn().mockResolvedValue(beaconsGatewayFixture),
      getBeacon: jest.fn(),
      saveBeacon: jest.fn(),
    };
  });

  it("renders a table", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);

    expect((await screen.findAllByRole("table")).length).toBeGreaterThan(0);
  });

  it("queries the injected gateway for beacon data", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);

    await waitFor(() => {
      expect(beaconsGatewayDouble.getAllBeacons).toHaveBeenCalled();
    });
  });

  it("displays the returned beacon data in the table", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);

    expect(await screen.findByText("Hex me difficultly")).toBeVisible();
  });

  it("displays 3 rows when 3 beacons are returned from the gateway", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);

    expect(await screen.findAllByTestId("beacons-table-row")).toHaveLength(3);
  });

  it("can click on the hex ID to see more details about the beacon", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);

    const hexIdField = await screen.findByText("Hex me");

    expect(hexIdField.getAttribute("href")).toBe(
      "/#/beacons/97b306aa-cbd0-4f09-aa24-2d876b983efb"
    );
  });
});
