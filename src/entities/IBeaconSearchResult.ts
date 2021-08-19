export interface IBeaconSearchResult {
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };

  _embedded: { "beacon-search": IBeaconSearchResultData[] };
}

export interface IBeaconSearchResultData {
  id: string;
  lastModifiedDate: string;
  beaconStatus: string;
  hexId: string;
  ownerName: string;
  useActivities: string;
  _links: {
    self: {
      href: string;
    };
    beaconSearchEntity: {
      href: string;
    };
  };
}
