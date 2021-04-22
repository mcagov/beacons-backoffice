import { render, screen, waitFor } from "@testing-library/react";
import { testBeacons } from "../gateways/BeaconsGateway.testData";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { BeaconsTable } from "./BeaconsTable";

describe("<BeaconsTable>", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getAllBeacons: jest.fn().mockResolvedValue(testBeacons),
    };
  });

  it("renders a table", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);
    expect((await screen.findAllByRole("table")).length).toBeGreaterThan(1);
  });

  it("queries the injected gateway for beacon data", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);

    await waitFor(() => {
      expect(beaconsGatewayDouble.getAllBeacons).toHaveBeenCalled();
    });
  });

  it("displays the returned beacon data in the table", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);
    expect(await screen.findByText(testBeacons[0].hexId)).toBeVisible();
  });

  it("can click on the hex ID to see more details about the beacon", async () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);
    const hexIdField = await screen.findByText(testBeacons[0].hexId);

    expect(hexIdField.getAttribute("href")).toBe(
      "/beacons/" + testBeacons[0].hexId
    );
  });
});
