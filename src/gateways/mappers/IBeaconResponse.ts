import { IApiResponse } from "./IApiResponse";

export interface IBeaconResponse extends IApiResponse {
  data: {
    type: string;
    id: string;
    attributes: {
      hexId: string;
      status?: string;
      type?: string;
      manufacturer?: string;
      createdDate?: string;
      lastModifiedDate?: string;
      model?: string;
      manufacturerSerialNumber?: string;
      chkCode?: string;
      mti?: string;
      protocolCode?: string;
      codingMethod?: string;
      batteryExpiryDate?: string;
      lastServicedDate?: string;
    };
    links: { verb: string; path: string }[];
    relationships: {
      uses: {
        data: { type: string; id: string }[];
      };
      owner: {
        data: { type: string; id: string }[];
      };
      emergencyContacts: {
        data: { type: string; id: string }[];
      };
    };
  };
}
