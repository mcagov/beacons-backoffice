import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beaconFixture } from "../fixtures/beacons.fixture";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { SingleBeaconRecordView } from "./SingleBeaconRecordView";

describe("Beacon record page", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(beaconFixture),
      getAllBeacons: jest.fn(),
    };
  });

  it("Displays correct Tab panel", async () => {
    render(
      <SingleBeaconRecordView
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    expect(await screen.findByText(/emergency contact 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/primary use/i)).toBeNull();

    const leftClick = { button: 1 };
    fireEvent.click(
      screen.getByText("0 Registered Uses", { exact: false }),
      leftClick
    );

    expect(await screen.findByText(/primary use/i)).toBeInTheDocument();
  });
});
