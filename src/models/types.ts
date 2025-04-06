export type Location = {
  id: number;
  name: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
};

export type Facility = {
  id: number;
  location_id: number;
  floor: string | null;
  facility_type_id: number;
};

export type FacilityType = {
  id: number;
  name: string;
};
