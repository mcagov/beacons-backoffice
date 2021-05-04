import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { testSingleBeacon } from "../testData/testBeacons";
import { SingleBeaconRecordView } from "./SingleBeaconRecordView";

describe("Beacon record page", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(testSingleBeacon),
      getAllBeacons: jest.fn(),
    };
  });

  it("Displays correct Tab panel", async () => {
    render(
      <SingleBeaconRecordView
        beaconsGateway={beaconsGatewayDouble}
        beaconId={testSingleBeacon.id}
      />
    );

    const leftClick = { button: 1 };

    expect(screen.getByText("Hello I am owner of boat")).toBeDefined();
    expect(screen.queryByText("Hello I am beacon use")).toBeNull();

    fireEvent.click(
      screen.getByText("Registered Uses", { exact: false }),
      leftClick
    );

    expect(await screen.findByText("Hello I am beacon use")).toBeDefined();
    expect(screen.queryByText("Hello I am owner of boat")).toBeNull();
  });
});
