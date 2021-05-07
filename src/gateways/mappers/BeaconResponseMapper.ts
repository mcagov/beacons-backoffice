import { IBeacon } from "../../entities/IBeacon";
import { IEmergencyContact } from "../../entities/IEmergencyContact";
import { IOwner } from "../../entities/IOwner";
import { IUse } from "../../entities/IUse";
import { IBeaconResponse } from "./IBeaconResponse";

export interface IBeaconResponseMapper {
  map: (beaconApiResponse: IBeaconResponse) => IBeacon;
}

export class BeaconResponseMapper implements IBeaconResponseMapper {
  public map(beaconApiResponse: IBeaconResponse): IBeacon {
    return {
      id: beaconApiResponse.data.id,
      hexId: beaconApiResponse.data.attributes.hexId,
      type: beaconApiResponse.data.attributes.type,
      manufacturer: beaconApiResponse.data.attributes.manufacturer,
      model: beaconApiResponse.data.attributes.model,
      status: beaconApiResponse.data.attributes.status,
      registeredDate: beaconApiResponse.data.attributes.createdDate,
      batteryExpiryDate: beaconApiResponse.data.attributes.batteryExpiryDate,
      chkCode: beaconApiResponse.data.attributes.chkCode,
      protocolCode: beaconApiResponse.data.attributes.protocolCode,
      lastServicedDate: beaconApiResponse.data.attributes.lastServicedDate,
      manufacturerSerialNumber:
        beaconApiResponse.data.attributes.manufacturerSerialNumber,
      owners: this.mapOwners(beaconApiResponse),
      emergencyContacts: this.mapEmergencyContacts(beaconApiResponse),
      uses: this.mapUses(beaconApiResponse),
    };
  }

  private mapOwners(beaconApiResponse: IBeaconResponse): IOwner[] {
    const ownerIds = beaconApiResponse.data.relationships.owner.data.map(
      (owner) => owner.id
    );

    return ownerIds.map((ownerId) => {
      const owner = beaconApiResponse.included.find(
        (entity) => entity.type === "beaconPerson" && entity.id === ownerId
      );

      if (!owner)
        throw ReferenceError(`Owner: ${ownerId} is defined as a relationship but not found in "included".  This is 
      likely to be a problem with the API response`);

      return {
        id: owner.id,
        fullName: owner.attributes.fullName,
        email: owner.attributes.email,
        telephoneNumber: owner.attributes.telephoneNumber,
        addressLine1: owner.attributes.addressLine1,
        addressLine2: owner.attributes.addressLine2,
        townOrCity: owner.attributes.townOrCity,
        county: owner.attributes.county,
        postcode: owner.attributes.postcode,
      };
    });
  }

  private mapEmergencyContacts(
    beaconApiResponse: IBeaconResponse
  ): IEmergencyContact[] {
    const emergencyContactIds = beaconApiResponse.data.relationships.emergencyContacts.data.map(
      (relationship) => relationship.id
    );

    return emergencyContactIds.map((emergencyContactId) => {
      const emergencyContact = beaconApiResponse.included.find(
        (entity) =>
          entity.type === "beaconPerson" && entity.id === emergencyContactId
      );

      if (!emergencyContact)
        throw ReferenceError(`Emergency contact: ${emergencyContactId} is defined as a relationship but not found in "included".  This is 
      likely to be a problem with the API response`);

      return {
        id: emergencyContactId,
        fullName: emergencyContact.attributes.fullName,
        telephoneNumber: emergencyContact.attributes.telephoneNumber,
        alternativeTelephoneNumber:
          emergencyContact.attributes.alternativeTelephoneNumber,
      };
    });
  }

  private mapUses(beaconApiResponse: IBeaconResponse): IUse[] {
    return beaconApiResponse.included
      .filter((entity) => entity.type === "beaconUse")
      .map((use) => ({
        id: use.id,
        environment: use.attributes.environment,
        purpose: use.attributes.purpose,
        activity: use.attributes.activity,
        moreDetails: use.attributes.moreDetails,
        mainUse: use.attributes.mainUse,
      }));
  }
}
