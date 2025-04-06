import type { Facility, FacilityType, Location } from '@/models/types';
import { calculateDistance } from '@/lib/utils';
import { bottleBaby, diaper } from '@lucide/lab';
import { Accessibility, Baby, CircleHelp, Icon, MapPin, Toilet } from 'lucide-react';
import React from 'react';

type FacilityCardProps = {
  location: Location;
  facility: Facility;
  facilityType: FacilityType;
  latitude: number;
  longitude: number;
};

const FacilityCard: React.FC<FacilityCardProps> = ({ location, facilityType, latitude, longitude }) => {
  const getFacilityIcon = (facilityTypeName: string) => {
    switch (facilityTypeName) {
      case 'Lactation Room':
        return <Icon iconNode={bottleBaby} />;
      case 'Diaper Changing Station':
        return <Icon iconNode={diaper} />;
      case 'Baby Room':
        return <Baby />;
      case 'Accessible Toilet':
        return <Accessibility />;
      case 'Communal Toilet':
        return <Toilet />;
      default:
        return <CircleHelp />;
    }
  };

  const distance = calculateDistance(latitude, longitude, location.latitude, location.longitude);

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex items-center">
      {/* Facility Icon */}
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
        {getFacilityIcon(facilityType.name)}
      </div>

      {/* Content on the Right */}
      <div className="flex-1">
        <h2 className="text-xl font-bold">{location.name}</h2>

        <div className="text-gray-600 flex items-center mt-2">
          <MapPin className="w-4 h-4 mr-1" />
          {distance}
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
