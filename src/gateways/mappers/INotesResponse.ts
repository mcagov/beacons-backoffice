import { IApiResponse } from "./IApiResponse";

export interface INotesResponse extends IApiResponse {
  data: {
    type: string;
    id: string;
    attributes: {
      beaconId: string;
      text: string;
      type: string;
      userId: string;
      fullName: string;
      email: string;
    };
    relationships: Record<string, any>;
  }[];
}
