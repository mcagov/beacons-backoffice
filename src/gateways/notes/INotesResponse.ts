import { IApiResponse } from "../IApiResponse";

export interface INotesResponse extends IApiResponse {
  data: [
    {
      type: string;
      id: string;
      attributes: {
        text?: string;
        type?: string;
        createdDate?: string;
        userId?: string;
        fullName?: string;
        email?: string;
      };
      links: { verb: string; path: string }[];
      relationships: {};
    }
  ];
}
