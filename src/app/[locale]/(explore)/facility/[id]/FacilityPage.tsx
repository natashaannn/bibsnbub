'use client';
import type { Amenity, Facility, FacilityType, Location } from '@/models/types';
import AmenitiesList from '@/components/AmenitiesList';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

type FacilityWithRelations = Omit<Facility, 'facility_type_id' | 'location_id'> & {
  location?: Location;
  facility_type?: FacilityType;
  facility_amenities: {
    quantity: number;
    amenity: Amenity;
  }[];
};

type FacilityDetailsProps = {
  facility: FacilityWithRelations;
};

const FacilityPage: React.FC<FacilityDetailsProps> = ({ facility }) => {
  const location = facility.location || {
    id: 0,
    address: 'Unknown Address',
    latitude: 0,
    longitude: 0,
  };

  const facilityType = facility.facility_type || {
    id: 0,
    name: 'Unknown Facility Type',
    description: 'No description available',
  };

  return (
    <div className="container mx-auto py-8">
      {/* Facility Name and Floor Badge */}
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold">
          {
            location.building
              ? location.building
              : location.block
                ? `${location.block} ${location.road}`
                : location.address
          }
        </h1>
        {facility.floor && <Badge className="mt-1 text-1xl">{facility.floor}</Badge>}
      </div>
      <p className="text-gray-600 mt-2">{facility.description}</p>

      {/* Facility Type */}
      <p className="text-gray-500 mt-1 italic">{facilityType.name}</p>

      {/* Accessibility */}
      <div className="mt-4 flex items-center gap-2">
        <span className="font-medium">Accessible:</span>
        {facility.is_accessible
          ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            )
          : (
              <XCircle className="text-red-500 w-5 h-5" />
            )}
      </div>

      {/* Amenities */}
      <AmenitiesList amenities={facility.facility_amenities} />
    </div>
  );
};

export default FacilityPage;
