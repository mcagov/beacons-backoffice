import { IBeacon } from "../../entities/IBeacon";
import { Environments } from "../../entities/IUse";

export class BeaconResponseTranslator {
  public translate(beaconApiResponse: IBeaconApiResponse): IBeacon {
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
      owners: [
        {
          id: "1",
          fullName: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
          email: "nelson@royalnavy.mod.uk",
          telephoneNumber: "02392 856624",
          addressLine1: "1 The Hard",
          addressLine2: "",
          townOrCity: "Portsmouth",
          county: "Hampshire",
          postcode: "PO1 3DT",
        },
      ],
      emergencyContacts: [
        {
          id: "2",
          fullName: "Lady Hamilton",
          telephoneNumber: "02392 856621",
          alternativeTelephoneNumber: "02392 856622",
        },
        {
          id: "3",
          fullName: "Neil Hamilton",
          telephoneNumber: "04392 856626",
          alternativeTelephoneNumber: "04392 856625",
        },
      ],
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
}

export interface IBeaconApiResponse {
  meta: Record<string, string>;
  links: {
    self: string;
    next: string;
    last: string;
  };
  data: {
    type: string;
    id: string;
    attributes: {
      hexId: string;
      status: string;
      manufacturer: string;
      createdDate: string;
      model: string;
      manufacturerSerialNumber: string;
      chkCode: string;
      batteryExpiryDate: string;
      lastServicedDate: string;
    };
    relationships: {
      uses: {
        links: {
          self: string;
          related: string;
        };
        data: { type: string; id: string }[];
      };
      owner: {
        links: {
          self: string;
          related: string;
        };
        data: { type: string; id: string };
      };
      emergencyContacts: {
        links: {
          self: string;
          related: string;
        };
        data: { type: string; id: string }[];
      };
    };
    links: {
      self: string;
    };
  };
  included: {
    type: string;
    id: string;
    attributes: Record<string, string | undefined>;
    links: {
      self: string;
    };
  }[];
}
