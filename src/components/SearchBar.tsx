'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export const SearchBar = () => {
  const [location, setLocation] = useState('');

  return (
    <div className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-gray-300 bg-white p-2 shadow-md">
      {/* Location Input */}
      <div className="flex w-full items-center gap-2 px-4">
        <MapPin className="h-5 w-5 text-gray-500" />
        <Input
          placeholder="Enter location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="border-none focus:ring-0"
        />
      </div>

      {/* Filters Button */}
      <Button variant="ghost" className="flex items-center gap-2 px-4">
        <SlidersHorizontal className="h-5 w-5 text-gray-500" />
        Filters
      </Button>

      {/* Search Button */}
      <Button className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
