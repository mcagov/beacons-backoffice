import { IEmergencyContact } from "./IEmergencyContact";
import { IOwner } from "./IOwner";
import { IUse } from "./IUse";

export interface IBeacon {
  hexId: string;
  registeredDate: Date;
  status: string;
  manufacturer: string;
  model: string;
  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: Date;
  lastServicedDate: Date;
  uses: IUse[];
  owner: IOwner;
  emergencyContacts: IEmergencyContact[];
}

export enum BeaconStatuses {
  new = "NEW",
}