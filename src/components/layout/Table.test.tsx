import { render, screen, waitFor } from "@testing-library/react";
import { testBeacons } from "../../gateways/BeaconsGateway.testData";
import { IBeaconsGateway } from "../../gateways/IBeaconsGateway";
import { Table, formatUses } from "./Table";
import { Activities, Environments, Purposes } from "../../entities/IUse";

describe("<Table>", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getAllBeacons: jest.fn().mockResolvedValue(testBeacons),
    };
  });

  it("renders a table", async () => {
    render(<Table beaconsGateway={beaconsGatewayDouble} />);

    expect((await screen.findAllByRole("table")).length).toBeGreaterThan(0);
  });

  it("queries the injected gateway for beacon data", async () => {
    render(<Table beaconsGateway={beaconsGatewayDouble} />);

    await waitFor(() => {
      expect(beaconsGatewayDouble.getAllBeacons).toHaveBeenCalled();
    });
  });

  it("displays the returned beacon data in the table", async () => {
    render(<Table beaconsGateway={beaconsGatewayDouble} />);

    expect(await screen.findByText(testBeacons[0].hexId)).toBeVisible();
  });

  it("displays 20 rows per page", async () => {
    render(<Table beaconsGateway={beaconsGatewayDouble} />);

    expect(await screen.findAllByTestId("beacons-table-row")).toHaveLength(20);
  });

  it("can click on the hex ID to see more details about the beacon", async () => {
    render(<Table beaconsGateway={beaconsGatewayDouble} />);

    const hexIdField = await screen.findByText(testBeacons[0].hexId);

    expect(hexIdField.getAttribute("href")).toBe(
      "/beacons/" + testBeacons[0].id
    );
  });
});

describe("formatUses()", () => {
  const expectations = [
    { in: [], out: "" },
    {
      in: [
        {
          environment: Environments.Maritime,
          purpose: Purposes.Commercial,
          activity: Activities.FishingVessel,
          moreDetails: "Bottom trawling for fish fingers",
        },
      ],
      out: "Fishing Vessel (Commercial)",
    },
    {
      in: [
        {
          environment: Environments.Maritime,
          purpose: Purposes.Commercial,
          activity: Activities.FishingVessel,
          moreDetails: "Bottom trawling for fish fingers",
        },
        {
          environment: Environments.Aviation,
          purpose: Purposes.Pleasure,
          activity: Activities.Glider,
          moreDetails: "Fly at the local gliding club every fortnight",
        },
      ],
      out: "Fishing Vessel (Commercial), Glider (Pleasure)",
    },
    {
      in: [
        {
          environment: Environments.Maritime,
          purpose: Purposes.Commercial,
          activity: Activities.FishingVessel,
          moreDetails: "Bottom trawling for fish fingers",
        },
        {
          environment: Environments.Land,
          activity: Activities.ClimbingMountaineering,
          moreDetails: "Hiking at the weekends",
        },
      ],
      out: "Fishing Vessel (Commercial), Climbing Mountaineering",
    },
  ];

  expectations.forEach((expectation) => {
    it(`formats ${expectation.in} ==> ${expectation.out}`, () => {
      expect(formatUses(expectation.in)).toEqual(expectation.out);
    });
  });
});