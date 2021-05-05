import { render, screen } from "@testing-library/react";
import { beaconFixture } from "fixtures/beacons.fixture";
import { emergencyContactsFixture } from "fixtures/emergencyContacts.fixture";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { EmergencyContactSummaryPanel } from "./EmergencyContactSummaryPanel";

describe("Emergency Contact Summary Panel", () => {
  let beaconsGatewayDouble: IBeaconsGateway;
  let getBeaconDouble: any;

  beforeEach(() => {
    getBeaconDouble = jest.fn();
    beaconsGatewayDouble = {
      getBeacon: getBeaconDouble,
      getAllBeacons: jest.fn(),
    };
  });

  it("should display the emergency contact details", async () => {
    getBeaconDouble.mockResolvedValue(beaconFixture);

    render(
      <EmergencyContactSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    expect(await screen.findByText(/Lady Hamilton/i)).toBeInTheDocument();
  });

  it("should change the index of the emergency contact", async () => {
    const twoEmergencyContactBeacon = { ...beaconFixture };
    twoEmergencyContactBeacon.emergencyContacts.push(
      ...emergencyContactsFixture
    );

    getBeaconDouble.mockResolvedValue(twoEmergencyContactBeacon);

    render(
      <EmergencyContactSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    expect(await screen.findByText(/Emergency Contact 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Emergency Contact 2/i)).toBeInTheDocument();
  });

  it("should display notice when no emergency contacts exist", async () => {
    const noEmergencyContactBeacon = { ...beaconFixture };
    noEmergencyContactBeacon.emergencyContacts = [];

    getBeaconDouble.mockResolvedValue(noEmergencyContactBeacon);

    render(
      <EmergencyContactSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    expect(
      await screen.findByText(/No emergency contacts/)
    ).toBeInTheDocument();
  });
});
