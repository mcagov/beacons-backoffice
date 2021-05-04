export interface IBeaconResponse {
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
    attributes: Record<string, string>;
    links: {
      self: string;
    };
  }[];
}
