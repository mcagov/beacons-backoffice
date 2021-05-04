import { IBeacon } from "../../entities/IBeacon";
import { IEmergencyContact } from "../../entities/IEmergencyContact";
import { IOwner } from "../../entities/IOwner";
import { Environments } from "../../entities/IUse";
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
      uses: [
        {
          id: "1",
          environment: Environments.Maritime,
          activity: "SAILING",
          moreDetails: "More details of this vessel",
        },
      ],
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
}
