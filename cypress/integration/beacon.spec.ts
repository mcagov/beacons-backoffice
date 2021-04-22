import {
  givenIAmAt,
  givenIHaveClickedTheTabContaining,
  iCanNotSeeTheText,
  iCanSeeTheText,
} from "../common/selectors";

describe("Beacon page", () => {
  beforeEach(() => {
    givenIAmAt("/#/beacon");
  });

  it("displays the Hex ID of the beacon", () => {
    iCanSeeTheText("Hex ID/UIN");
  });

  it("shows the beacon Summary", () => {
    iCanSeeTheText("Summary");
  });

  it("displays the Owner & Emergency Contacts tab", () => {
    givenIHaveClickedTheTabContaining("Owner & Emergency Contacts");
    iCanSeeTheText("Hello I am owner of boat");
    iCanNotSeeTheText("Hello I am beacon use");
  });

  it("displays the Registered Uses tab", () => {
    givenIHaveClickedTheTabContaining("Registered Uses");
    iCanSeeTheText("Hello I am beacon use");
    iCanNotSeeTheText("Hello I am owner of boat");
  });
});
