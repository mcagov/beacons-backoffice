import { IBeacon } from "../../entities/IBeacon";
import { beaconFixture } from "../../fixtures/beacons.fixture";
import { singleBeaconApiResponse } from "../../fixtures/singleBeaconApiResponse.fixture";
import { BeaconResponseTranslator } from "./BeaconResponseTranslator";
import { IBeaconResponse } from "./IBeaconResponse";

describe("BeaconResponseTranslator", () => {
  let beaconApiResponse: IBeaconResponse;
  let translatedBeacon: IBeacon;

  beforeEach(() => {
    beaconApiResponse = singleBeaconApiResponse;
    translatedBeacon = beaconFixture;
  });

  it("translates a single beacon API response payload to an IBeacon", () => {
    const beaconTranslator = new BeaconResponseTranslator();

    expect(beaconTranslator.translate(beaconApiResponse)).toStrictEqual(
      translatedBeacon
    );
  });

  it("translates a different single beacon API response payload to an IBeacon", () => {
    const newResponse = { ...beaconApiResponse };
    const newTranslatedBeacon = { ...translatedBeacon };
    newResponse.data.attributes.model = "EPIRB2";
    newTranslatedBeacon.model = "EPIRB2";
    const beaconTranslator = new BeaconResponseTranslator();

    expect(beaconTranslator.translate(beaconApiResponse)).toStrictEqual(
      translatedBeacon
    );
  });
});
