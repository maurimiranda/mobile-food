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
