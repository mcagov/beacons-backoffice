import { render, screen } from "@testing-library/react";
import React from "react";
import { beaconFixture } from "../fixtures/beacons.fixture";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { IUsesGateway } from "../gateways/IUsesGateway";
import { SingleBeaconRecordView } from "./SingleBeaconRecordView";

describe("Beacon record page", () => {
  let beaconsGatewayDouble: IBeaconsGateway;
  let usesGatewayDouble: IUsesGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(beaconFixture),
      getAllBeacons: jest.fn(),
      updateBeacon: jest.fn(),
    };

    usesGatewayDouble = {
      getUses: jest.fn(),
    };
  });

  it("Displays beacon's hex ID", async () => {
    render(
      <SingleBeaconRecordView
        beaconsGateway={beaconsGatewayDouble}
        usesGateway={usesGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );
    const hexId = beaconFixture.hexId;

    expect(await screen.findByText(`Hex ID/UIN: ${hexId}`)).toBeDefined();
  });

  it("Displays the number of uses a beacon has", async () => {
    render(
      <SingleBeaconRecordView
        beaconsGateway={beaconsGatewayDouble}
        usesGateway={usesGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );
    const numberOfUses = beaconFixture.uses.length;

    expect(
      await screen.findByText(`${numberOfUses} Registered Uses`)
    ).toBeDefined();
  });
});
