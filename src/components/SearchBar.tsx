'use client';
import type { Address } from '@/types/Address';
import type { OneMapApiResponse } from '@/types/OneMap';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { mapOneMapToAddress } from '@/utils/mapOneMapToAddress';
import { Navigation, SearchX } from 'lucide-react';
import { useState } from 'react';

type SearchBarProps = {
  onSearchAction: (latitude: number, longitude: number) => void;
  onUseCurrentLocationAction: () => void;
};

export const SearchBar = ({ onSearchAction, onUseCurrentLocationAction }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<Address[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);

  const authToken = process.env.ONEMAP_API_KEY || '';

  const fetchSuggestions = async (query: string): Promise<Address[]> => {
    if (!query.trim()) {
      setSuggestions([]);
      return [];
    }

    try {
      const response = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${query}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
        {
          method: 'GET',
          headers: {
            Authorization: authToken,
          },
        },
      );
      const data: OneMapApiResponse = await response.json();

      if (data.results) {
        const mappedSuggestions = data.results.map(mapOneMapToAddress);
        setSuggestions(mappedSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
    return [];
  };

  const handleSuggestionClick = (latitude: number, longitude: number, address: string) => {
    setLocation(address);
    setIsUsingCurrentLocation(false);
    onSearchAction(latitude, longitude);
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setLocation('Your location');
    setIsUsingCurrentLocation(true);
    onUseCurrentLocationAction();
    setIsOpen(false);
  };

  const clearInput = () => {
    setLocation('');
    setSuggestions([]);
    setIsUsingCurrentLocation(false);
  };

  return (
    <div className="relative w-full max-w-3xl">
      {/* Search Bar */}
      <Command className="rounded-lg border shadow-md md:min-w-[450px]" onClick={() => setIsOpen(true)}>
        <CommandInput
          placeholder="Search for a location..."
          value={location}
          onValueChange={(value) => {
            setLocation(value);
            fetchSuggestions(value);
            setIsOpen(true);
            setIsUsingCurrentLocation(false);
          }}
          className={`w-full border-none focus:ring-0 ${
            isUsingCurrentLocation ? 'text-blue-400' : ''
          }`}
        />
      </Command>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search for a location..."
          value={location}
          onValueChange={(value) => {
            setLocation(value);
            fetchSuggestions(value);
            setIsUsingCurrentLocation(false);
          }}
        />
        <CommandList>
          <div className="px-2 py-1">
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-2 text-sm hover:bg-gray-100"
              onClick={clearInput}
            >
              <SearchX className="h-4 w-4 text-gray-500" />
              <span>Clear location</span>
            </button>
            {location.trim() === '' && (
              <button
                type="button"
                className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                onClick={handleUseCurrentLocation}
              >
                <Navigation className="h-4 w-4 text-gray-500" />
                <span>Use Current Location</span>
              </button>
            )}
          </div>

          <CommandGroup heading="Suggestions">
            {suggestions.length > 0
              ? (
                  suggestions.map(suggestion => (
                    <CommandItem
                      key={suggestion.address}
                      onSelect={() => handleSuggestionClick(suggestion.latitude, suggestion.longitude, suggestion.address)}
                      className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                    >
                      {suggestion.address}
                    </CommandItem>
                  ))
                )
              : (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;
