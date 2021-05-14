import { FieldValueTypes } from "../components/dataPanel/FieldValue";
import { IEmergencyContact } from "../entities/IEmergencyContact";
import { IOwner } from "../entities/IOwner";
import { Activities, IUse } from "../entities/IUse";

export enum WritingStyle {
  KeyValueSeparator = ":",
}

export enum Placeholders {
  NoData = "NO DATA ENTERED",
  UnspecifiedError = "An error occurred",
}

export const formatUses = (uses: IUse[]): string =>
  uses.reduce((formattedUses, use, index, uses) => {
    if (index === uses.length - 1) return formattedUses + formatUse(use);
    return formattedUses + formatUse(use) + ", ";
  }, "");

export const formatUse = (use: IUse): string => {
  const formattedActivity =
    use.activity === Activities.Other
      ? titleCase(use.otherActivity || "")
      : titleCase(use.activity);
  const formattedPurpose = use.purpose ? ` (${titleCase(use.purpose)})` : "";
  return formattedActivity + formattedPurpose;
};

export const titleCase = (text: string): string => {
  return text
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => (word[0] || "").toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatOwners = (owners: IOwner[]): string =>
  owners.map((owner) => owner.fullName).join(", ");

export const formatEmergencyContacts = (
  emergencyContacts: IEmergencyContact[]
): string => `${emergencyContacts.length} listed`;

export const formatFieldValue = (
  value: string | undefined,
  valueType?: FieldValueTypes
): JSX.Element => {
  if (value) return <b>{value.toLocaleUpperCase()}</b>;
  if (valueType === FieldValueTypes.MULTILINE) return <></>;

  return <i>{Placeholders.NoData}</i>;
};
