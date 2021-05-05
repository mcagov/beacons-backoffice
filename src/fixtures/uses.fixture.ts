import { Activities, Environments, IUse, Purposes } from "../entities/IUse";

export const usesFixture: IUse[] = [
  Object.freeze({
    id: "e00036c4-e3f4-46bb-aa9e-1d91870d9172",
    environment: Environments.Maritime,
    purpose: Purposes.Commercial,
    activity: Activities.FishingVessel,
    moreDetails: "I take people out in my yacht.",
  }),
];
