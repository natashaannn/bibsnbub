export type Location = {
  id: number;
  name: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
};

export type Amenity = {
  id: number;
  name: string;
  description: string | null;
};

export type Facility = {
  id: number;
  location_id: number;
  facility_type_id: number;
  floor: string;
  is_accessible: boolean;
  description: string | null;
  has_diaper_changing_station: boolean;
  has_lactation_room: boolean;
  amenities?: Amenity[];
};

export type FacilityType = {
  id: number;
  name: string;
};
