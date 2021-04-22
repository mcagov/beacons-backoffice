export class BeaconsGateway implements IBeaconsGateway {
  public getAllBeacons(): Beacon[] {
    // TODO: Replace with API call
    const owner: IOwner = {
      fullName: "Steve Stevington",
      email: "steve@beaconowner.com",
      telephoneNumber: "07872536271",
      addressLine1: "1 Beacon Square",
      addressLine2: "",
      townOrCity: "Beaconsfield",
      county: "Yorkshire",
      postcode: "BS8 7NW",
    };

    const uses: IUse[] = [
      {
        environment: "MARITIME",
        purpose: "COMMERCIAL",
        activity: "SAILING",
        moreDetails: "I take people out in my yacht.",
      },
    ];

    const emergencyContacts: IEmergencyContact[] = [
      {
        fullName: "Sam Samington",
        telephoneNumber: "07281627389",
        alternativeTelephoneNumber: "01284 627381",
      },
    ];

    const beacon = {
      hexId: "1D0...",
      manufacturer: "OceanSignal",
      model: "EPIRB",
      manufacturerSerialNumber: "123ABC",
      chkCode: "456QWE",
      batteryExpiryDate: new Date("1 April 2022"),
      lastServicedDate: new Date("1 April 2019"),
      uses: uses,
      owner: owner,
      emergencyContacts: emergencyContacts,
    };

    return [beacon];
  }
}
