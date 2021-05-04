export const singleBeaconApiResponse = Object.freeze({
  meta: {},
  links: {
    self: "IDK",
    next: "IDK",
    last: "IDK",
  },
  data: {
    type: "beacon",
    id: "97b306aa-cbd0-4f09-aa24-2d876b983efb",
    attributes: {
      hexId: "Hex me",
      status: "NEW",
      manufacturer: "Ocean Signal",
      createdDate: "2020-02-01T00:00",
      model: "EPIRB1",
      manufacturerSerialNumber: "1407312904",
      chkCode: "9480B",
      batteryExpiryDate: "2020-02-01T00:00",
      lastServicedDate: "2020-02-01T00:00",
    },
    relationships: {
      uses: {
        links: {
          self: "IDK",
          related: "IDK",
        },
        data: [{ type: "beaconUse", id: "1" }],
      },
      owner: {
        links: {
          self: "IDK",
          related: "IDK",
        },
        data: { type: "beaconPerson", id: "1" },
      },
      emergencyContacts: {
        links: {
          self: "IDK",
          related: "IDK",
        },
        data: [
          { type: "beaconPerson", id: "2" },
          { type: "beaconPerson", id: "3" },
        ],
      },
    },
    links: {
      self: "IDK",
    },
  },
  included: [
    {
      type: "beaconUse",
      id: "1",
      attributes: {
        environment: "MARITIME",
        activity: "SAILING",
        moreDetails: "More details of this vessel",
      },
      links: {
        self: "IDK",
      },
    },
    {
      type: "beaconPerson",
      id: "1",
      attributes: {
        fullName: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
        email: "nelson@royalnavy.mod.uk",
        telephoneNumber: "02392 856624",
        addressLine1: "1 The Hard",
        addressLine2: "",
        townOrCity: "Portsmouth",
        county: "Hampshire",
        postcode: "PO1 3DT",
      },
      links: {
        self: "IDK",
      },
    },
    {
      type: "beaconPerson",
      id: "2",
      attributes: {
        fullName: "Lady Hamilton",
        telephoneNumber: "02392 856621",
        alternativeTelephoneNumber: "02392 856622",
      },
      links: {
        self: "IDK",
      },
    },
    {
      type: "beaconPerson",
      id: "3",
      attributes: {
        fullName: "Neil Hamilton",
        telephoneNumber: "04392 856626",
        alternativeTelephoneNumber: "04392 856625",
      },
      links: {
        self: "IDK",
      },
    },
  ],
});
