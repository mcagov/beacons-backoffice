import { Activities, Environments, Purposes } from "../entities/IUse";
import { formatUses } from "./formatUses";

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
