import { IBeaconSearchResult } from "../entities/IBeaconSearchResult";
import { deepFreeze } from "../utils";

export const beaconSearchResultFixture = deepFreeze<IBeaconSearchResult>({
  page: {
    size: 20,
    totalElements: 3,
    totalPages: 1,
    number: 0,
  },
  _embedded: {
    "beacon-search": [
      {
        // id: "97b306aa-cbd0-4f09-aa24-2d876b983efb",
        hexId: "Hex me",
        beaconStatus: "NEW",
        lastModifiedDate: "2020-02-01T00:00",
        useActivities: "SAILING, KAYAKING",
        ownerName: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
      },
      {
        // id: "97b306aa-cbd0-4f09-aa24-2d876b983efc",
        hexId: "Hex me difficultly",
        beaconStatus: "NEW",
        lastModifiedDate: "2020-02-01T00:00",
        useActivities: "MOTORING",
        ownerName: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
      },
      {
        // id: "97b306aa-cbd0-4f09-aa24-2d876b983efd",
        hexId: "Hex me beacon",
        beaconStatus: "NEW",
        lastModifiedDate: "2020-02-01T00:00",
        useActivities: "VESSELING",
        ownerName: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
      },
    ],
  },
});
