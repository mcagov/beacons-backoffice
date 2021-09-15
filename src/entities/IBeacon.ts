import { IEmergencyContact } from "./IEmergencyContact";
import { IEntityLink } from "./IEntityLink";
import { IOwner } from "./IOwner";
import { IUse } from "./IUse";

export interface IBeacon {
  id: string;
  hexId: string;
  type: string;
  registeredDate: string;
  lastModifiedDate: string;
  status: string;
  manufacturer: string;
  model: string;
  manufacturerSerialNumber: string;
  chkCode: string;
  protocolCode: string;
  codingMethod: string;
  batteryExpiryDate: string;
  lastServicedDate: string;
  mti: string;
  uses: IUse[];
  owners: IOwner[];
  emergencyContacts: IEmergencyContact[];
  entityLinks: IEntityLink[];
}

export enum BeaconStatuses {
  New = "NEW",
  Deleted = "DELETED",
  Migrated = "MIGRATED",
}

export enum BeaconTypes {
  Epirb = "EPIRB",
  Plb = "PLB",
  Elt = "ELT",
}
