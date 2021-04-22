import { render, screen } from "@testing-library/react";
import { BeaconsTable } from "./BeaconsTable";

describe("<BeaconsTable>", () => {
  const beaconsGatewayDouble = {
    getAllBeacons: jest.fn(),
  };

  it("renders a table", () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);

    expect(screen.getAllByRole("table").length).toBeGreaterThan(1);
  });

  it("queries the injected gateway for beacon data", () => {
    render(<BeaconsTable beaconsGateway={beaconsGatewayDouble} />);

    expect(beaconsGatewayDouble.getAllBeacons).toHaveBeenCalled();
  });

  it("renders the returned beacon data in the table", () => {});
});
