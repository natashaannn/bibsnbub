import { MapPin, Star } from 'lucide-react';
import AmenityIcons from './AmenityIcons';

type FacilityCardProps = {
  name: string;
  distance: string;
  rating: number;
  amenities: {
    hotWater: boolean;
    changingTable: boolean;
    sink: boolean;
    outlet: boolean;
    wastebasket: boolean;
    waitingArea: boolean;
    privateNursingArea: boolean;
  };
};

export default function FacilityCard({ name, distance, rating, amenities }: FacilityCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold">{name}</h2>
      <AmenityIcons amenities={amenities} />
      <p className="text-gray-600 flex items-center">
        <MapPin className="w-4 h-4 mr-1" />
        {distance}
      </p>
      <p className="text-gray-600 flex items-center">
        <Star className="w-4 h-4 mr-1 text-yellow-500" />
        {rating}
      </p>
    </div>
  );
}
