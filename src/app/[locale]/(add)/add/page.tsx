'use client';

import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddFacilityPage() {
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    building: '',
    block: '',
    road: '',
    address: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    facilityTypeId: '',
    floor: '',
    description: '',
    hasDiaperChangingStation: false,
    hasLactationRoom: false,
    howToAccess: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: checked }));
  // };

  const handleLocationSelect = (latitude: number, longitude: number, address: string) => {
    setFormData(prev => ({
      ...prev,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      address,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Submit the form data
    const res = await fetch('/api/facilities', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        createdBy: user?.id,
      }),
    });

    if (res.ok) {
      toast.success('Facility added successfully!');
      router.push('/');
    } else {
      toast.warning('Failed to add facility. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Facility</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <SearchBar
            onSearchAction={(latitude, longitude) => handleLocationSelect(latitude, longitude, formData.address)}
            onUseCurrentLocationAction={() => toast.warning('Using current location is not supported yet.')}
          />
        </div>
        <div>
          <Label htmlFor="building">Building</Label>
          <Input id="building" name="building" value={formData.building} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="block">Block</Label>
          <Input id="block" name="block" value={formData.block} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="road">Road</Label>
          <Input id="road" name="road" value={formData.road} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="facilityTypeId">Facility Type</Label>
          <Select onValueChange={value => setFormData(prev => ({ ...prev, facilityTypeId: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a facility type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Type 1</SelectItem>
              <SelectItem value="2">Type 2</SelectItem>
              {/* Add more facility types dynamically */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="floor">Floor</Label>
          <Input id="floor" name="floor" value={formData.floor} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="hasDiaperChangingStation" name="hasDiaperChangingStation" checked={formData.hasDiaperChangingStation} onChange={e => setFormData(prev => ({ ...prev, hasLactationRoom: (e.target as HTMLInputElement).checked }))} />
          <Label htmlFor="hasDiaperChangingStation">Has Diaper Changing Station</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="hasLactationRoom" name="hasLactationRoom" checked={formData.hasLactationRoom} onChange={e => setFormData(prev => ({ ...prev, hasLactationRoom: (e.target as HTMLInputElement).checked }))} />
          <Label htmlFor="hasLactationRoom">Has Lactation Room</Label>
        </div>
        <div>
          <Label htmlFor="howToAccess">How to Access</Label>
          <Textarea id="howToAccess" name="howToAccess" value={formData.howToAccess} onChange={handleInputChange} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
