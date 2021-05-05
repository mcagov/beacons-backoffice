import { render, screen } from "@testing-library/react";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { testSingleBeacon } from "../testData/testBeacons";
import { testEmergencyContacts } from "../testData/testEmergencyContacts";
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
    getBeaconDouble.mockResolvedValue(testSingleBeacon);

    render(
      <EmergencyContactSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={testSingleBeacon.id}
      />
    );

    expect(await screen.findByText(/Sam Samington/i)).toBeInTheDocument();
  });

  it("should change the index of the emergency contact", async () => {
    const twoEmergencyContactBeacon = { ...testSingleBeacon };
    twoEmergencyContactBeacon.emergencyContacts.push(...testEmergencyContacts);

    getBeaconDouble.mockResolvedValue(twoEmergencyContactBeacon);

    render(
      <EmergencyContactSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={testSingleBeacon.id}
      />
    );

    expect(await screen.findByText(/Emergency Contact 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Emergency Contact 2/i)).toBeInTheDocument();
  });

  it("should display notice when no emergency contacts exist", async () => {
    const noEmergencyContactBeacon = { ...testSingleBeacon };
    noEmergencyContactBeacon.emergencyContacts = [];

    getBeaconDouble.mockResolvedValue(noEmergencyContactBeacon);

    render(
      <EmergencyContactSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={testSingleBeacon.id}
      />
    );

    expect(
      await screen.findByText(/No emergency contacts/)
    ).toBeInTheDocument();
  });
});
