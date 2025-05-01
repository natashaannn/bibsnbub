'use client';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Navigation, SearchX } from 'lucide-react';
import { useState } from 'react';

type SearchBarProps = {
  onSearch: (latitude: number, longitude: number) => void;
  onUseCurrentLocation: () => void;
};

export const SearchBar = ({ onSearch, onUseCurrentLocation }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<{ address: string; latitude: number; longitude: number }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);

  const authToken = process.env.ONEMAP_API_KEY || '';

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
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
      const data = await response.json();
      if (data.results) {
        setSuggestions(
          data.results.map((result: any) => ({
            address: result.ADDRESS,
            latitude: Number.parseFloat(result.LATITUDE),
            longitude: Number.parseFloat(result.LONGITUDE),
          })),
        );
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (latitude: number, longitude: number, address: string) => {
    setLocation(address);
    setIsUsingCurrentLocation(false);
    onSearch(latitude, longitude);
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setLocation('Your location');
    setIsUsingCurrentLocation(true);
    onUseCurrentLocation();
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
