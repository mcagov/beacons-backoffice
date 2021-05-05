import { IBeacon } from "../../entities/IBeacon";
import { beaconFixture } from "../../fixtures/beacons.fixture";
import { singleBeaconApiResponseFixture } from "../../fixtures/singleBeaconApiResponse.fixture";
import { BeaconResponseMapper } from "./BeaconResponseMapper";
import { IBeaconResponse } from "./IBeaconResponse";

describe("BeaconResponseMapper", () => {
  let beaconApiResponse: IBeaconResponse;
  let translatedBeacon: IBeacon;

  beforeEach(() => {
    beaconApiResponse = singleBeaconApiResponseFixture;
    translatedBeacon = beaconFixture;
  });

  it("translates a single beacon API response payload to an IBeacon", () => {
    const beaconTranslator = new BeaconResponseMapper();

    expect(beaconTranslator.translate(beaconApiResponse)).toStrictEqual(
      translatedBeacon
    );
  });

  it("translates a different single beacon API response payload to an IBeacon", () => {
    const newResponse = { ...beaconApiResponse };
    const newTranslatedBeacon = { ...translatedBeacon };
    newResponse.data.attributes.model = "EPIRB2";
    newTranslatedBeacon.model = "EPIRB2";
    const beaconTranslator = new BeaconResponseMapper();

    expect(beaconTranslator.translate(newResponse)).toStrictEqual(
      newTranslatedBeacon
    );
  });
});
