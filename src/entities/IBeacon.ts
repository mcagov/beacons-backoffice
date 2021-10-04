import { IEmergencyContact } from "./IEmergencyContact";
import { IEntityLink } from "./IEntityLink";
import { IOwner } from "./IOwner";
import { IUse } from "./IUse";

export interface IBeacon {
  id: string;
  hexId: string;
  beaconType: string;
  registeredDate: string;
  lastModifiedDate: string;
  status: string;
  manufacturer: string;
  model: string;
  manufacturerSerialNumber: string;
  chkCode: string;
  protocol: string;
  coding: string;
  batteryExpiryDate: string;
  lastServicedDate: string;
  mti: string;
  svdr: string;
  csta: string;
  uses: IUse[];
  owners: IOwner[];
  emergencyContacts: IEmergencyContact[];
  entityLinks: IEntityLink[];
}

export enum BeaconStatuses {
  New = "NEW",
  Deleted = "DELETED",
  Migrated = "MIGRATED",
  Claimed = "DELETED (CLAIMED)",
  Rejected = "DELETED (REJECTED)",
}

export enum BeaconTypes {
  Epirb = "EPIRB",
  Plb = "PLB",
  Elt = "ELT",
}
