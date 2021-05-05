import faker from "faker";
import { BeaconStatuses, BeaconTypes, IBeacon } from "../entities/IBeacon";
import { emergencyContactsFixture } from "./emergencyContacts.fixture";
import { testOwners } from "./owner.fixture";
import { usesFixture } from "./uses.fixture";

export const beaconFixture: IBeacon = Object.freeze({
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
});

const ukHexIds = [
  "1D04FF28FD28123",
  "1D011E918520F29",
  "1D03E048DB878E4",
  "1D050CB418D0379",
  "1D0CBC2C738C59F",
  "1D0FF91DAF3F550",
  "1D09C13DD1C4730",
  "1D0CBE0F232CD63",
  "1D0F58C80F811EC",
  "1D0C31F8A3FA74B",
  "1D05086712720F0",
  "1D05E6F0FB87AC9",
  "1D0A4C113A79E9B",
  "1D0F5F497FA2983",
  "1D04EE229F2AB20",
  "1D0E6FB4F62F3F4",
  "1D0587A66CB6EC1",
  "1D0F74819B7EF23",
  "1D094FFB62A7058",
  "1D034C45B9C211A",
  "1D0B96E3E1DD78E",
];

export const beaconsFixture = new Array(21)
  .fill(beaconFixture)
  .map((beacon, i) => {
    return {
      ...beacon,
      id: faker.datatype.uuid(),
      hexId: ukHexIds[i],
      owner: { ...beacon.owner, fullName: faker.name.findName() },
    };
  });
