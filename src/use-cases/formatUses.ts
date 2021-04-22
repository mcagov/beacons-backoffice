import { IUse, Purposes } from "../entities/IUse";
import { titleCase } from "../utils";

export const formatUses = (uses: IUse[]): string =>
  uses.reduce((formattedUses, use, index, uses) => {
    if (index === uses.length - 1) return formattedUses + formatUse(use);
    return formattedUses + formatUse(use) + ", ";
  }, "");

const formatUse = (use: IUse): string => {
  const formattedActivity = titleCase(use.activity);
  const formattedPurpose =
    use.purpose === Purposes.Null ? "" : ` (${titleCase(use.purpose)})`;
  return formattedActivity + formattedPurpose;
};
