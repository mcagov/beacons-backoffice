import { IBeacon } from "../../entities/IBeacon";
import { beaconFixture } from "../../fixtures/beacons.fixture";
import { singleBeaconApiResponseFixture } from "../../fixtures/singleBeaconApiResponse.fixture";
import { BeaconResponseMapper } from "./BeaconResponseMapper";
import { IBeaconResponse } from "./IBeaconResponse";

describe("BeaconResponseMapper", () => {
  let beaconApiResponse: IBeaconResponse;
  let mappedBeacon: IBeacon;

  beforeEach(() => {
    beaconApiResponse = singleBeaconApiResponseFixture;
    mappedBeacon = beaconFixture;
  });

  it("maps a single beacon API response payload to an IBeacon", () => {
    const responseMapper = new BeaconResponseMapper();

    expect(responseMapper.map(beaconApiResponse)).toStrictEqual(mappedBeacon);
  });

  it("maps a different single beacon API response payload to an IBeacon", () => {
    const newResponse = { ...beaconApiResponse };
    const newMappedBeacon = { ...mappedBeacon };
    newResponse.data.attributes.model = "EPIRB2";
    newMappedBeacon.model = "EPIRB2";
    const responseMapper = new BeaconResponseMapper();

    expect(responseMapper.map(newResponse)).toStrictEqual(newMappedBeacon);
  });

  it("replaces undefined values with empty strings", () => {
    beaconApiResponse.data.attributes.batteryExpiryDate = undefined;
    beaconApiResponse.data.attributes.protocolCode = undefined;
    expectedBeacon.batteryExpiryDate = "";
    expectedBeacon.protocolCode = "";
    const responseMapper = new BeaconResponseMapper();

    const mappedBeacon = responseMapper.map(beaconApiResponse);

    expect(mappedBeacon).toStrictEqual(expectedBeacon);
  });
});
