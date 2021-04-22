import {
  givenIAmAt,
  givenIHaveClickedTheTabContaining,
  iCanNotSeeTheText,
  iCanSeeTheText,
} from "../common/selectors";

describe("As a Registry team member, on the beacon page, I can", () => {
  beforeEach(() => {
    givenIAmAt("/#/beacon");
  });

  it("see the Hex ID of the beacon", () => {
    iCanSeeTheText("Hex ID/UIN");
  });

  it("see the beacon Summary", () => {
    iCanSeeTheText("Summary");
  });

  it("see the Owner & Emergency Contacts tab", () => {
    givenIHaveClickedTheTabContaining("Owner & Emergency Contacts");
    iCanSeeTheText("Hello I am owner of boat");
    iCanNotSeeTheText("Hello I am beacon use");
  });

  it("see the Registered Uses tab", () => {
    givenIHaveClickedTheTabContaining("Registered Uses");
    iCanSeeTheText("Hello I am beacon use");
    iCanNotSeeTheText("Hello I am owner of boat");
  });
});
