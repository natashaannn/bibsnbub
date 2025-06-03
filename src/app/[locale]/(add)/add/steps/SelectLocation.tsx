import SearchBar from '@/components/SearchBar';
import { Label } from '@/components/ui/label';
import { handleUseCurrentLocation } from '@/lib/utils';
import React from 'react';
import { toast } from 'sonner';

type SelectLocationProps = {
  formData: {
    building: string;
    block: string;
    road: string;
    address: string;
    postalCode: string;
    latitude: string;
    longitude: string;
  };
  setFormData: (data: any) => void;
};

const SelectLocation: React.FC<SelectLocationProps> = ({ formData, setFormData }) => {
  const handleLocationSelect = (latitude: number, longitude: number, address: string) => {
    setFormData((prev: any) => ({
      ...prev,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      address,
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select Location</h2>
      <Label htmlFor="search">Search for a location</Label>
      <SearchBar
        onSearchAction={(latitude, longitude) => handleLocationSelect(latitude, longitude, formData.address)}
        onUseCurrentLocationAction={() =>
          handleUseCurrentLocation(
            (latitude, longitude) => handleLocationSelect(latitude, longitude, 'Your location'),
            () => toast.warning('Unable to retrieve your location. Please try again.'),
          )}
      />

    </div>
  );
};

export default SelectLocation;
