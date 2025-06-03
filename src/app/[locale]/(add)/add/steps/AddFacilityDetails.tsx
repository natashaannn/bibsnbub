import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import ShadCN Select components
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

type AddFacilityDetailsProps = {
  formData: {
    floor: string | null;
    description: string;
  };
  setFormData: (data: any) => void;
};

const AddFacilityDetails: React.FC<AddFacilityDetailsProps> = ({ formData, setFormData }) => {
  const [customFloor, setCustomFloor] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFloorChange = (value: string) => {
    if (value === 'No floor') {
      setFormData((prev: any) => ({ ...prev, floor: null }));
      setCustomFloor(false);
    } else if (value === 'Custom') {
      setFormData((prev: any) => ({ ...prev, floor: 'Custom' })); // Keep dropdown value as "Custom"
      setCustomFloor(true);
    } else {
      setFormData((prev: any) => ({ ...prev, floor: value }));
      setCustomFloor(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Enter Floor and Description</h2>
      <Label htmlFor="floor">Floor</Label>
      <Select onValueChange={handleFloorChange} value={customFloor ? 'Custom' : formData.floor || ''}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select a floor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="No floor">No floor</SelectItem>
          <SelectItem value="B1">B1</SelectItem>
          <SelectItem value="B2">B2</SelectItem>
          <SelectItem value="B2">B3</SelectItem>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="3">4</SelectItem>
          <SelectItem value="Custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      {customFloor && (
        <>
          <Label htmlFor="floor" className="mb-2">Custom Floor</Label>
          <Input
            id="floor"
            name="floor"
            value={formData.floor || ''}
            onChange={e => handleInputChange(e)}
            placeholder="Enter custom floor (e.g., G, M, 25)"
            className="mb-4"
          />
        </>
      )}
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="e.g., Next to the 7-eleven or Across from the lift"
        className="mb-2"
      />
      <p className="text-sm text-gray-500">
        Provide a description to help users locate the facility easily. Examples: "Next to the 7-eleven" or "Across from the lift."
      </p>
    </div>
  );
};

export default AddFacilityDetails;
