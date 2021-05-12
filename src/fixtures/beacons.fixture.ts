import { BeaconStatuses, BeaconTypes, IBeacon } from "../entities/IBeacon";
import { emergencyContactsFixture } from "./emergencyContacts.fixture";
import { testOwners } from "./owner.fixture";
import { usesFixture } from "./uses.fixture";

export const beaconFixture: IBeacon = (() => {
  return {
    id: "f48e8212-2e10-4154-95c7-bdfd061bcfd2",
    hexId: "1D0EA08C52FFBFF",
    type: BeaconTypes.Epirb,
    protocolCode: "AX7098",
    registeredDate: "2018-06-08T00:00",
    status: BeaconStatuses.New,
    manufacturer: "Ocean Signal",
    model: "Excelsior",
    manufacturerSerialNumber: "1407312904",
    chkCode: "456QWE",
    batteryExpiryDate: "2020-02-01T00:00",
    lastServicedDate: "2020-02-01T00:00",
    uses: usesFixture,
    owners: testOwners,
    emergencyContacts: emergencyContactsFixture,
  };
})();
