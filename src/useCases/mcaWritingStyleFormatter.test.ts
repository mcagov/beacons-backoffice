import { formatDate, titleCase } from "./mcaWritingStyleFormatter";

describe("formatDate()", () => {
  const expectations = [
    { in: new Date("1 April 2021"), out: "1 Apr 21" },
    { in: new Date("1 April 2022"), out: "1 Apr 22" },
    { in: new Date("31 October 2028"), out: "31 Oct 28" },
  ];

  expectations.forEach((expectation) => {
    it(`formats ${JSON.stringify(expectation.in)} ==> ${
      expectation.out
    }`, () => {
      expect(formatDate(expectation.in)).toEqual(expectation.out);
    });
  });
});

describe("titleCase()", () => {
  const expectations = [
    { in: "fish and chips", out: "Fish And Chips" },
    { in: "fish_and_chips", out: "Fish And Chips" },
  ];

  expectations.forEach((expectation) => {
    it(`formats ${JSON.stringify(expectation.in)} ==> ${
      expectation.out
    }`, () => {
      expect(titleCase(expectation.in)).toEqual(expectation.out);
    });
  });
});
