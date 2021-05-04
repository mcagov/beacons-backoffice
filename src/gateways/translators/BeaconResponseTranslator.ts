import { IBeacon } from "../../entities/IBeacon";
import { IEmergencyContact } from "../../entities/IEmergencyContact";
import { IOwner } from "../../entities/IOwner";
import { IUse } from "../../entities/IUse";
import { IBeaconResponse } from "./IBeaconResponse";

export class BeaconResponseTranslator {
  public translate(beaconApiResponse: IBeaconResponse): IBeacon {
    return {
      batteryExpiryDate: beaconApiResponse.data.attributes.batteryExpiryDate,
      chkCode: beaconApiResponse.data.attributes.chkCode,
      hexId: beaconApiResponse.data.attributes.hexId,
      id: beaconApiResponse.data.id,
      lastServicedDate: beaconApiResponse.data.attributes.lastServicedDate,
      manufacturer: beaconApiResponse.data.attributes.manufacturer,
      manufacturerSerialNumber:
        beaconApiResponse.data.attributes.manufacturerSerialNumber,
      model: beaconApiResponse.data.attributes.model,
      registeredDate: beaconApiResponse.data.attributes.createdDate,
      status: beaconApiResponse.data.attributes.status,
      owners: this.translateOwners(beaconApiResponse),
      emergencyContacts: this.translateEmergencyContacts(beaconApiResponse),
      uses: this.translateUses(beaconApiResponse),
    };
  }

  private translateOwners(beaconApiResponse: IBeaconResponse): IOwner[] {
    const ownerId = beaconApiResponse.data.relationships.owner.data.id;

    return beaconApiResponse.included
      .filter(
        (entity) => entity.type === "beaconPerson" && entity.id === ownerId
      )
      .map((owner) => {
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

  private translateEmergencyContacts(
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

      return {
        id: emergencyContactId,
        fullName: emergencyContact.attributes.fullName,
        telephoneNumber: emergencyContact.attributes.telephoneNumber,
        alternativeTelephoneNumber:
          emergencyContact.attributes.alternativeTelephoneNumber,
      };
    });
  }

  private translateUses(beaconApiResponse: IBeaconResponse): IUse[] {
    return (beaconApiResponse.included
      .filter((entity) => entity.type === "beaconUse")
      .map((use) => {
        return {
          id: use.id,
          environment: use.attributes.environment,
          activity: use.attributes.activity,
          moreDetails: use.attributes.moreDetails,
        };
      }) as unknown) as IUse[];
  }
}
