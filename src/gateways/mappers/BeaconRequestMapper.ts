import { IBeacon } from "../../entities/IBeacon";
import { IBeaconRequest } from "./IBeaconRequest";

export interface IBeaconRequestMapper {
  map: (beaconId: string, beacon: Partial<IBeacon>) => IBeaconRequest;
}

export class BeaconRequestMapper {
  public map(beaconId: string, beacon: Partial<IBeacon>): IBeaconRequest {
    return {
      data: {
        type: "beacon",
        id: beaconId,
        attributes: {
          ...(beacon.hexId && {
            hexId: beacon.hexId,
          }),
          ...(beacon.type && {
            type: beacon.type,
          }),
          ...(beacon.protocolCode && {
            protocolCode: beacon.protocolCode,
          }),
          ...(beacon.registeredDate && {
            registeredDate: beacon.registeredDate,
          }),
          ...(beacon.status && {
            status: beacon.status,
          }),
          ...(beacon.manufacturer && {
            manufacturer: beacon.manufacturer,
          }),
          ...(beacon.model && {
            model: beacon.model,
          }),
          ...(beacon.manufacturerSerialNumber && {
            manufacturerSerialNumber: beacon.manufacturerSerialNumber,
          }),
          ...(beacon.chkCode && {
            chkCode: beacon.chkCode,
          }),
          ...(beacon.batteryExpiryDate && {
            batteryExpiryDate: beacon.batteryExpiryDate,
          }),
          ...(beacon.lastServicedDate && {
            lastServicedDate: beacon.lastServicedDate,
          }),
        },
      },
    };
  }
}
