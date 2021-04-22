import { render, screen, waitFor } from "@testing-library/react";
import { BeaconStatuses, IBeacon } from "../entities/IBeacon";
import { IEmergencyContact } from "../entities/IEmergencyContact";
import { IOwner } from "../entities/IOwner";
import { IUse } from "../entities/IUse";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { BeaconsTable } from "./BeaconsTable";

describe("<BeaconsTable>", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getAllBeacons: jest.fn().mockResolvedValue(mockBeaconData),
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
    expect(await screen.findByText(beacon.hexId)).toBeVisible();
  });
});

const owner: IOwner = {
  fullName: "Steve Stevington",
  email: "steve@beaconowner.com",
  telephoneNumber: "07872536271",
  addressLine1: "1 Beacon Square",
  addressLine2: "",
  townOrCity: "Beaconsfield",
  county: "Yorkshire",
  postcode: "BS8 7NW",
};

const uses: IUse[] = [
  {
    environment: "MARITIME",
    purpose: "COMMERCIAL",
    activity: "SAILING",
    moreDetails: "I take people out in my yacht.",
  },
];

const emergencyContacts: IEmergencyContact[] = [
  {
    fullName: "Sam Samington",
    telephoneNumber: "07281627389",
    alternativeTelephoneNumber: "01284 627381",
  },
];

const beacon = {
  hexId: "1D0...",
  registeredDate: new Date("21 April 2021"),
  status: BeaconStatuses.new,
  manufacturer: "OceanSignal",
  model: "EPIRB",
  manufacturerSerialNumber: "123ABC",
  chkCode: "456QWE",
  batteryExpiryDate: new Date("1 April 2022"),
  lastServicedDate: new Date("1 April 2019"),
  uses: uses,
  owner: owner,
  emergencyContacts: emergencyContacts,
};

const mockBeaconData: IBeacon[] = [beacon];
