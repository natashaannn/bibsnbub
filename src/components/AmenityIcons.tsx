import { Coffee, Milk, Plug, ShowerHead, Sofa, Trash2 } from 'lucide-react';

type AmenityIconsProps = {
  amenities: {
    hotWater: boolean;
    sink: boolean;
    outlet: boolean;
    wastebasket: boolean;
    waitingArea: boolean;
    privateNursingArea: boolean;
  };
};

export default function AmenityIcons({ amenities }: AmenityIconsProps) {
  return (
    <div className="flex space-x-2 text-gray-600">
      {amenities.hotWater && <Coffee size={20} />}
      {amenities.sink && <ShowerHead size={20} />}
      {amenities.outlet && <Plug size={20} />}
      {amenities.wastebasket && <Trash2 size={20} />}
      {amenities.waitingArea && <Sofa size={20} />}
      {amenities.privateNursingArea && <Milk size={20} />}
    </div>
  );
}
