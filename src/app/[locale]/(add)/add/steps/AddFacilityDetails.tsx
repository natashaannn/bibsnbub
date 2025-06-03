import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

type AddFacilityDetailsProps = {
  formData: {
    floor: string;
    description: string;
  };
  setFormData: (data: any) => void;
};

const AddFacilityDetails: React.FC<AddFacilityDetailsProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Enter Floor and Description</h2>
      <Label htmlFor="floor">Floor</Label>
      <Input id="floor" name="floor" value={formData.floor} onChange={handleInputChange} />
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
    </div>
  );
};

export default AddFacilityDetails;
