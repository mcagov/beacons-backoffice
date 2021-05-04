import { IOwner } from "../entities/IOwner";

export const ownerFixture: IOwner = {
  id: "cb2e9fd2-45bb-4865-a04c-add5bb7c34a7",
  fullName: "Steve Stevington",
  email: "steve@beaconowner.com",
  telephoneNumber: "07872536271",
  addressLine1: "1 Beacon Square",
  addressLine2: "",
  townOrCity: "Beaconsfield",
  county: "Yorkshire",
  postcode: "BS8 7NW",
};

export const testOwners: IOwner[] = [ownerFixture];
