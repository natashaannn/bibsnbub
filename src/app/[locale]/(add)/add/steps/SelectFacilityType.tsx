import { Button } from '@/components/ui/button';
import React from 'react';

type SelectFacilityTypeProps = {
  facilityTypeId: string;
  setFacilityTypeId: (id: string) => void;
  facilityTypes: { id: string; name: string }[];
};

const SelectFacilityType: React.FC<SelectFacilityTypeProps> = ({ facilityTypeId, setFacilityTypeId, facilityTypes }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Which of these best describes the facility?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {facilityTypes.map(type => (
          <Button
            key={type.id}
            variant={facilityTypeId === type.id ? 'default' : 'outline'}
            onClick={() => setFacilityTypeId(type.id)}
            className="whitespace-normal text-center px-4 py-2"
          >
            {type.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectFacilityType;
