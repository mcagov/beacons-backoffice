export interface IBeaconSearchResult {
  meta: { count: number; pageSize: number };

  data: {
    type: "beaconSearchResult";
    id: string;
    attributes: {
      hexId: string;
      beaconStatus: string;
      lastModifiedDate: string;
      ownerName: string;
      beaconUse: string;
    };
  }[];
}
