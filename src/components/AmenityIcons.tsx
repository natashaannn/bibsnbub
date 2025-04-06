import { Coffee, Milk, Plug, ShowerHead, Sofa, Trash2 } from 'lucide-react';

type AmenityIconsProps = {
  amenities: {
    hasHotWater: boolean;
    hasSink: boolean;
    hasOutlet: boolean;
    hasWastebasket: boolean;
    hasWaitingArea: boolean;
    hasPrivateNursingArea: boolean;
  };
};

export default function AmenityIcons({ amenities }: AmenityIconsProps) {
  return (
    <div className="flex space-x-2 text-gray-600">
      {amenities.hasHotWater && <Coffee size={20} />}
      {amenities.hasSink && <ShowerHead size={20} />}
      {amenities.hasOutlet && <Plug size={20} />}
      {amenities.hasWastebasket && <Trash2 size={20} />}
      {amenities.hasWaitingArea && <Sofa size={20} />}
      {amenities.hasPrivateNursingArea && <Milk size={20} />}
    </div>
  );
}
