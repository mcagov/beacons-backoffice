interface Beacon {
  hexId: string;
  manufacturer: string;
  model: string;
  manufacturerSerialNumber: string;
  chkCode: string;
  batteryExpiryDate: Date;
  lastServicedDate: Date;
  uses: IUse[];
  owner: IOwner;
  emergencyContacts: IEmergencyContact[];
}
