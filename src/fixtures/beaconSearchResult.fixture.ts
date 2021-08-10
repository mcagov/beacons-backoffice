import { IBeaconSearchResult } from "../entities/IBeaconSearchResult";
import { deepFreeze } from "../utils";

export const beaconSearchResultFixture = deepFreeze<IBeaconSearchResult>({
  meta: {
    count: 3,
    pageSize: 1,
  },
  data: [
    {
      type: "beaconSearchResult",
      id: "97b306aa-cbd0-4f09-aa24-2d876b983efb",
      attributes: {
        hexId: "Hex me",
        beaconStatus: "NEW",
        lastModifiedDate: "2020-02-01T00:00",
        beaconUse: "Sailing, Kayaking",
        ownerName: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
      },
    },
    {
      type: "beaconSearchResult",
      id: "97b306aa-cbd0-4f09-aa24-2d876b983efc",
      attributes: {
        hexId: "Hex me difficultly",
        beaconStatus: "NEW",
        lastModifiedDate: "2020-02-01T00:00",
        beaconUse: "Motoring",
        ownerName: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
      },
    },
    {
      type: "beaconSearchResult",
      id: "97b306aa-cbd0-4f09-aa24-2d876b983efd",
      attributes: {
        hexId: "Hex me beacon",
        beaconStatus: "NEW",
        lastModifiedDate: "2020-02-01T00:00",
        beaconUse: "Vesseling",
        ownerName: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
      },
    },
  ],
});
