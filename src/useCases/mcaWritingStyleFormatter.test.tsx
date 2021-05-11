import { FieldValueTypes } from "../components/dataPanel/FieldValue";
import { Activities, Environments, Purposes } from "../entities/IUse";
import {
  formatDateLong,
  formatDateShort,
  formatFieldValue,
  formatOwners,
  formatUses,
  noDataEntered,
  Placeholders,
  titleCase,
} from "./mcaWritingStyleFormatter";

describe("formatDateLong()", () => {
  const expectations = [
    { in: "1 April 2021", out: "1 Apr 21" },
    { in: "1 April 2022", out: "1 Apr 22" },
    { in: "31 October 2028", out: "31 Oct 28" },
  ];

  expectations.forEach((expectation) => {
    it(`formats ${JSON.stringify(expectation.in)} ==> ${
      expectation.out
    }`, () => {
      expect(formatDateLong(expectation.in)).toEqual(expectation.out);
    });
  });
});

describe("formatDateShort()", () => {
  const expectations = [
    { in: "2020-02-01T00:00:00.000Z", out: "Feb 2020" },
    { in: "2021-05-06T10:00:03.592854", out: "May 2021" },
  ];

  expectations.forEach((expectation) => {
    it(`formats ${JSON.stringify(expectation.in)} ==> ${
      expectation.out
    }`, () => {
      expect(formatDateShort(expectation.in)).toEqual(expectation.out);
    });
  });
});

describe("titleCase()", () => {
  const expectations = [
    { in: "fish and chips", out: "Fish And Chips" },
    { in: "fish_and_chips", out: "Fish And Chips" },
    { in: "HOT_AIR_BALLOON", out: "Hot Air Balloon" },
  ];

  expectations.forEach((expectation) => {
    it(`formats ${JSON.stringify(expectation.in)} ==> ${
      expectation.out
    }`, () => {
      expect(titleCase(expectation.in)).toEqual(expectation.out);
    });
  });
});

describe("formatUses()", () => {
  const expectations = [
    { in: [], out: "" },
    {
      in: [
        {
          id: "1",
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
          id: "1",
          environment: Environments.Maritime,
          purpose: Purposes.Commercial,
          activity: Activities.FishingVessel,
          moreDetails: "Bottom trawling for fish fingers",
        },
        {
          id: "2",
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
          id: "1",
          environment: Environments.Maritime,
          purpose: Purposes.Commercial,
          activity: Activities.FishingVessel,
          moreDetails: "Bottom trawling for fish fingers",
        },
        {
          id: "2",
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

describe("formatOwners()", () => {
  const expectations = [
    { in: [], out: "" },
    {
      in: [
        {
          id: "1",
          fullName: "Steve Stevington",
          email: "steve@thestevingtons.com",
          telephoneNumber: "07826 543728",
          addressLine1: "FFF",
          addressLine2: "59 Stevenswood Road",
          townOrCity: "Bristol",
          county: "",
          postcode: "BS8 9NW",
        },
      ],
      out: "Steve Stevington",
    },
    {
      in: [
        {
          id: "1",
          fullName: "Steve Stevington",
          email: "steve@thestevingtons.com",
          telephoneNumber: "07826 543728",
          addressLine1: "FFF",
          addressLine2: "59 Stevenswood Road",
          townOrCity: "Bristol",
          county: "",
          postcode: "BS8 9NW",
        },
        {
          id: "2",
          fullName: "Prunella Stevington",
          email: "prunella@thestevingtons.com",
          telephoneNumber: "07826 543728",
          addressLine1: "FFF",
          addressLine2: "59 Stevenswood Road",
          townOrCity: "Bristol",
          county: "",
          postcode: "BS8 9NW",
        },
      ],
      out: "Steve Stevington, Prunella Stevington",
    },
  ];

  expectations.forEach((expectation) => {
    it(`formats ${expectation.in} ==> ${expectation.out}`, () => {
      expect(formatOwners(expectation.in)).toEqual(expectation.out);
    });
  });
});

describe("formatFieldValue()", () => {
  const expectations = [
    { in: undefined, out: <i>{Placeholders.NoData}</i> },
    { in: "", out: <i>{Placeholders.NoData}</i> },
    { in: "Beacons", out: <b>BEACONS</b> },
    { in: "1234", out: <b>1234</b> },
  ];

  expectations.forEach((expectation) => {
    it(`formats ${JSON.stringify(expectation.in)} ==> ${
      expectation.out
    }`, () => {
      expect(formatFieldValue(expectation.in)).toEqual(expectation.out);
    });
  });

  it("formats dates correctly", () => {
    expect(
      formatFieldValue("2021-05-06T10:00:04.285653", FieldValueTypes.DATE)
    ).toEqual(<b>May 2021</b>);
  });

  it(`formats ${FieldValueTypes.MULTILINE} values correctly i.e. will not show ${Placeholders.NoData} if value is missing`, () => {
    expect(formatFieldValue("", FieldValueTypes.MULTILINE)).toEqual(<></>);
  });
});

describe("noDataEntered()", () => {
  const expectations = [
    { in: undefined, out: true },
    { in: "", out: true },
    { in: " ", out: true },
    { in: " d a t a w i t h s p a c e s", out: false },
    { in: "-", out: false },
    { in: "data", out: false },
    { in: "0", out: false },
  ];

  expectations.forEach((expectation) => {
    it(`${expectation.in} ===> ${expectation.out}`, () => {
      expect(noDataEntered(expectation.in)).toBe(expectation.out);
    });
  });
});
