import { Activities, Environments, IUse, Purposes } from "../entities/IUse";

export const testUses: IUse[] = [
  {
    environment: Environments.Maritime,
    purpose: Purposes.Commercial,
    activity: Activities.FishingVessel,
    moreDetails: "I take people out in my yacht.",
  },
];
