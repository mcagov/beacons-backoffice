import { IEmergencyContact } from "./IEmergencyContact";
import { IOwner } from "./IOwner";
import { IUse } from "./IUse";

export interface IBeacon {
  id: string;
  hexId: string;
  type: BeaconTypes;
  protocolCode: string;
  registeredDate: Date;
  status: string;
  manufacturer: string;
  model: string;
  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: string;
  lastServicedDate: string;
  uses: IUse[];
  owners: IOwner[];
  emergencyContacts: IEmergencyContact[];
}

export enum BeaconStatuses {
  New = "NEW",
}

export enum BeaconTypes {
  Epirb = "EPIRB",
  Plb = "PLB",
  Elt = "ELT",
}
