import { IApiResponse } from "./IApiResponse";

export interface IBeaconResponse extends IApiResponse {
  data: {
    type: string;
    id: string;
    attributes: {
      hexId: string;
      status: string;
      type: string;
      manufacturer: string;
      createdDate: string;
      model: string;
      manufacturerSerialNumber: string;
      chkCode: string;
      protocolCode: string;
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
}
