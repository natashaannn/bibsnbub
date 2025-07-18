import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import ShadCN Select components
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

type AddFacilityDetailsProps = {
  formData: {
    floor: string | null;
    description: string;
    howToAccess: string;
    femalesOnly: boolean;
  };
  setFormData: (data: any) => void;
};

const AddFacilityDetails: React.FC<AddFacilityDetailsProps> = ({ formData, setFormData }) => {
  const [customAccess, setCustomAccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAccessChange = (value: string) => {
    if (value === 'Custom') {
      setFormData((prev: any) => ({ ...prev, howToAccess: 'Custom' }));
      setCustomAccess(true);
    } else {
      setFormData((prev: any) => ({ ...prev, howToAccess: value }));
      setCustomAccess(false);
    }
  };

  const handleFemalesOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({ ...prev, femalesOnly: e.target.checked }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Enter Facility Details</h2>

      {/* Floor Selection */}
      <Label htmlFor="floor">Floor</Label>
      <Select onValueChange={value => setFormData((prev: any) => ({ ...prev, floor: value }))} value={formData.floor || ''}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select a floor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="No floor">No floor</SelectItem>
          <SelectItem value="B1">B1</SelectItem>
          <SelectItem value="B2">B2</SelectItem>
          <SelectItem value="G">G</SelectItem>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="Custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {/* Custom Floor Input */}
      {formData.floor === 'Custom' && (
        <>
          <Label htmlFor="floor" className="mb-2">Custom Floor</Label>
          <Input
            id="floor"
            name="floor"
            value={formData.floor || ''}
            onChange={handleInputChange}
            placeholder="Enter custom floor (e.g., G, M, 25)"
            className="mb-4"
          />
        </>
      )}

      {/* How to Access Selection */}
      <Label htmlFor="howToAccess">How to Access</Label>
      <Select onValueChange={handleAccessChange} value={customAccess ? 'Custom' : formData.howToAccess || ''}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select how to access" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Intercom">Call security via intercom</SelectItem>
          <SelectItem value="Phone">Call security via phone</SelectItem>
          <SelectItem value="Public">Just enter as a member of public</SelectItem>
          <SelectItem value="Employees">Employees only</SelectItem>
          <SelectItem value="Custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {/* Custom Access Input */}
      {customAccess && (
        <>
          <Label htmlFor="howToAccess" className="mb-2">Custom Access</Label>
          <Input
            id="howToAccess"
            name="howToAccess"
            value={formData.howToAccess || ''}
            onChange={handleInputChange}
            placeholder="Enter custom access instructions"
            className="mb-4"
          />
        </>
      )}

      {/* Females Only Checkbox */}
      <Label htmlFor="femalesOnly" className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="femalesOnly"
          name="femalesOnly"
          checked={formData.femalesOnly}
          onChange={handleFemalesOnlyChange}
          className="cursor-pointer"
        />
        Females Only
      </Label>

      {/* Description */}
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="e.g., Next to the 7-eleven or Across from Skechers"
        className="mb-2"
      />
      <p className="text-sm text-gray-500">
        Provide a description to help users locate the facility easily. Examples: "Next to the 7-eleven" or "Across from Skechers."
      </p>
    </div>
  );
};

export default AddFacilityDetails;
