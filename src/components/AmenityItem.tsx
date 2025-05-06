import type { Amenity } from '@/models/types';
import { bottleBaby } from '@lucide/lab';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import { Coffee, Droplet, Icon, Plug, Trash2, Wifi, XCircle } from 'lucide-react';
import React from 'react';

type AmenityItemProps = {
  amenity: Amenity;
  quantity: number;
};

const AmenityItem: React.FC<AmenityItemProps> = ({ amenity, quantity }) => {
  const getAmenityIcon = (amenityName: string) => {
    switch (amenityName.toLowerCase()) {
      case 'sink':
        return <Droplet className="w-5 h-5 text-gray-600" />;
      case 'hot water dispenser':
        return <Coffee className="w-5 h-5 text-gray-600" />;
      case 'cold water dispenser':
        return <Droplet className="w-5 h-5 text-blue-500" />;
      case 'diaper changing station':
        return <BabyChangingStationIcon className="w-5 h-5 text-gray-600" />;
      case 'wifi':
        return <Wifi className="w-5 h-5 text-gray-600" />;
      case 'trash bin':
        return <Trash2 className="w-5 h-5 text-gray-600" />;
      case 'electrical outlet':
        return <Plug className="w-5 h-5 text-gray-600" />;
      case 'lactation room':
        return <Icon className="w-5 h-5 text-green-500" iconNode={bottleBaby} />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <li className="flex items-center gap-2">
      {getAmenityIcon(amenity.name)}
      <span>
        {amenity.name}
        {amenity.is_multiple_applicable && quantity > 0 ? ` (x${quantity})` : ''}
      </span>
    </li>
  );
};

export default AmenityItem;
