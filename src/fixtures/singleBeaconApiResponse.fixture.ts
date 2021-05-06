export const singleBeaconApiResponseFixture = Object.freeze({
  meta: {},
  data: {
    type: "beacon",
    id: "f48e8212-2e10-4154-95c7-bdfd061bcfd2",
    attributes: {
      hexId: "1D0EA08C52FFBFF",
      status: "NEW",
      type: "EPIRB",
      protocolCode: "AX7098",
      manufacturer: "Ocean Signal",
      createdDate: "2018-06-08T00:00",
      model: "Excelsior",
      manufacturerSerialNumber: "1407312904",
      chkCode: "456QWE",
      batteryExpiryDate: "2020-02-01T00:00",
      lastServicedDate: "2020-02-01T00:00",
    },
    relationships: {
      uses: {
        data: [{ type: "beaconUse", id: "1" }],
      },
      owner: {
        data: [
          {
            type: "beaconPerson",
            id: "cb2e9fd2-45bb-4865-a04c-add5bb7c34a7",
          },
        ],
      },
      emergencyContacts: {
        data: [
          { type: "beaconPerson", id: "5ffd1b86-d347-49e2-b821-4550c72666c1" },
          { type: "beaconPerson", id: "3851e8c7-6e4e-4827-ab8f-b904f845582f" },
        ],
      },
    },
  },
  included: [
    {
      type: "beaconUse",
      id: "e00036c4-e3f4-46bb-aa9e-1d91870d9172",
      attributes: {
        environment: "MARITIME",
        purpose: "COMMERCIAL",
        activity: "FISHING_VESSEL",
        moreDetails: "I take people out in my yacht.",
      },
    },
    {
      type: "beaconPerson",
      id: "cb2e9fd2-45bb-4865-a04c-add5bb7c34a7",
      attributes: {
        fullName: "Steve Stevington",
        email: "steve@beaconowner.com",
        telephoneNumber: "07872536271",
        addressLine1: "1 Beacon Square",
        addressLine2: "",
        townOrCity: "Beaconsfield",
        county: "Yorkshire",
        postcode: "BS8 7NW",
      },
    },
    {
      type: "beaconPerson",
      id: "5ffd1b86-d347-49e2-b821-4550c72666c1",
      attributes: {
        fullName: "Lady Hamilton",
        telephoneNumber: "02392 856621",
        alternativeTelephoneNumber: "02392 856622",
      },
    },
    {
      type: "beaconPerson",
      id: "3851e8c7-6e4e-4827-ab8f-b904f845582f",
      attributes: {
        fullName: "Neil Hamilton",
        telephoneNumber: "04392 856626",
        alternativeTelephoneNumber: "04392 856625",
      },
    },
  ],
});
