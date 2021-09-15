import { BeaconStatuses, IBeacon } from "../entities/IBeacon";
import { IEmergencyContact } from "../entities/IEmergencyContact";
import { IUse } from "../entities/IUse";
import { deepFreeze } from "../utils";
import { emergencyContactsFixture } from "./emergencyContacts.fixture";
import { testOwners } from "./owner.fixture";
import { usesFixture } from "./uses.fixture";

export const beaconFixture = deepFreeze<IBeacon>({
  id: "f48e8212-2e10-4154-95c7-bdfd061bcfd2",
  hexId: "1D0EA08C52FFBFF",
  type: "Beacon type to be derived from Hex ID",
  protocolCode: "Protocol code to be derived from Hex ID",
  codingMethod: "Coding method to be derived from Hex ID",
  registeredDate: "08/06/2018",
  status: BeaconStatuses.New,
  manufacturer: "Ocean Signal",
  mti: "EXAMPLE MTI",
  model: "Excelsior",
  manufacturerSerialNumber: "1407312904",
  chkCode: "456QWE",
  batteryExpiryDate: "01/02/2020",
  lastServicedDate: "01/02/2020",
  lastModifiedDate: "01/02/2021",
  uses: usesFixture as IUse[],
  owners: testOwners,
  emergencyContacts: emergencyContactsFixture as IEmergencyContact[],
  entityLinks: [
    { verb: "GET", path: "/beacons/f48e8212-2e10-4154-95c7-bdfd061bcfd2" },
    { verb: "PATCH", path: "/beacons/f48e8212-2e10-4154-95c7-bdfd061bcfd2" },
  ],
});
