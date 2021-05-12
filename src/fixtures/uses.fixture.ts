import { Activities, Environments, IUse, Purposes } from "../entities/IUse";
import { deepFreeze } from "../utils";

const getUseFixture = (id: string, mainUse: boolean): IUse =>
  deepFreeze({
    id,
    environment: Environments.Maritime,
    purpose: Purposes.Commercial,
    activity: Activities.FishingVessel,
    moreDetails: "I take people out in my yacht.",
    callSign: "Call me",
    vhfRadio: true,
    fixedVhfRadio: true,
    fixedVhfRadioValue: "123456",
    portableVhfRadio: true,
    portableVhfRadioValue: "123456",
    satelliteTelephone: true,
    satelliteTelephoneValue: "123456",
    mobileTelephone: true,
    mobileTelephone1: "0123456789",
    mobileTelephone2: "01234567890",
    otherCommunication: true,
    otherCommunicationValue: "By fax",
    maxCapacity: 10,
    vesselName: "SS Great Britain",
    portLetterNumber: "1",
    homeport: "England",
    areaOfOperation: "Bristol",
    beaconLocation: "Carry bag",
    imoNumber: "1",
    ssrNumber: "2",
    rssNumber: "3",
    officialNumber: "4",
    rigPlatformLocation: "5",
    aircraftManufacturer: "Boeing",
    principalAirport: "Bristol",
    secondaryAirport: "Cardiff",
    registrationMark: "High flying",
    hexAddress: "Aircraft hex",
    cnOrMsnNumber: "1",
    dongle: false,
    beaconPosition: "In my carry bag",
    workingRemotelyLocation: "Bristol",
    workingRemotelyPeopleCount: 1,
    windfarmLocation: "Scotland",
    windfarmPeopleCount: "100",
    otherActivityLocation: "Manchester",
    otherActivityPeopleCount: "10",
    mainUse,
  });

export const usesFixture: IUse[] = deepFreeze([
  {
    ...getUseFixture("e00036c4-e3f4-46bb-aa9e-1d91870d9172", true),
  },
  {
    ...getUseFixture("e00036c4-e3f4-46bb-aa9e-1d91870d9173", false),
  },
]);
