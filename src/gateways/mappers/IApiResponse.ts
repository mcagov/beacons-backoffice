export interface IApiResponse {
  meta: Record<string, any>;
  data: Record<string, any> | Record<string, any>[];
  links: {
    self: string;
    next: string;
    last: string;
  };
  included: {
    type: string;
    id: string;
    attributes: Record<string, any>;
    links: {
      self: string;
    };
  }[];
}
