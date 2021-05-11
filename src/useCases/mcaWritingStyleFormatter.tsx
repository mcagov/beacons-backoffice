import { FieldValueTypes } from "../components/dataPanel/FieldValue";
import { IEmergencyContact } from "../entities/IEmergencyContact";
import { IOwner } from "../entities/IOwner";
import { IUse } from "../entities/IUse";

export enum WritingStyle {
  KeyValueSeparator = ":",
}

export enum Placeholders {
  NoData = "NO DATA ENTERED",
  UnspecifiedError = "An error occurred",
}

export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  const [, month, day, year] = date.toDateString().split(" ");
  return `${parseInt(day)} ${month} ${year.slice(2)}`;
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  const [, month, , year] = date.toDateString().split(" ");
  return `${month} ${year}`;
};

export const formatUses = (uses: IUse[]): string =>
  uses.reduce((formattedUses, use, index, uses) => {
    if (index === uses.length - 1) return formattedUses + formatUse(use);
    return formattedUses + formatUse(use) + ", ";
  }, "");

const formatUse = (use: IUse): string => {
  const formattedActivity = titleCase(use.activity);
  const formattedPurpose = use.purpose ? ` (${titleCase(use.purpose)})` : "";
  return formattedActivity + formattedPurpose;
};

export const titleCase = (text: string): string => {
  return text
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
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
  if (value) {
    if (valueType === FieldValueTypes.DATE) {
      return <b>{formatDateShort(value)}</b>;
    } else {
      return <b>{value.toLocaleUpperCase()}</b>;
    }
  } else {
    if (valueType !== FieldValueTypes.MULTILINE)
      return <i>{Placeholders.NoData}</i>;
    return <></>;
  }
};

export const beaconOwnerDidNotDisclose = (
  value: string | undefined
): Boolean => {
  return value === undefined || value === "" || /^\s*$/.test(value);
};
