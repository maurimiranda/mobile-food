type ApiPermit = {
  objectid: string;
  applicant: string;
  facilitytype: string;
  cnn: string;
  address: string;
  block: string;
  lot: string;
  permit: string;
  status: string;
  fooditems: string;
  latitude: string;
  longitude: string;
  schedule: string;
  approved?: string;
  received: string;
  expirationdate: string;
};

type Permit = {
  id: string;
  applicant: string;
  type: FacilityType;
  cnn: string;
  address: string;
  block: string;
  lot: string;
  permit: string;
  status: PermitStatus;
  food: string;
  latitude: number;
  longitude: number;
  schedule: string;
  approved?: Date;
  received: Date;
  expiration: Date;
};
