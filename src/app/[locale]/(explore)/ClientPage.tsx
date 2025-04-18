'use client';

import type { Facility, FacilityType, Location } from '@/models/types';
import CategoryScroller from '@/components/CategoryScroller';
import FacilityCard from '@/components/FacilityCard';
import SearchBar from '@/components/SearchBar';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {
  locationsData: Location[];
  facilitiesData: Facility[];
  facilityTypesData: FacilityType[];
};

export default function ClientPage({
  locationsData,
  facilitiesData,
  facilityTypesData,
}: Props) {
  const t = useTranslations('Index');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setUserLocation({ latitude: 1.3521, longitude: 103.8198 });
  }, []);

  const filteredFacilities = facilitiesData?.filter((facility) => {
    if (selectedCategory === 'Diaper Changing Station') {
      return facility.has_diaper_changing_station;
    } else if (selectedCategory === 'Lactation Room') {
      return facility.has_lactation_room;
    }
    return true;
  });

  return (
    <div className="py-5 text-xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('meta_title')}</h1>
        <p className="mt-4">{t('meta_description')}</p>
      </div>

      <SearchBar />
      <CategoryScroller onCategorySelect={setSelectedCategory} />

      {locationsData.map((location) => {
        const locationFacilities = filteredFacilities.filter(
          facility => facility.location_id === location.id,
        );

        return locationFacilities.map((facility) => {
          const facilityType = facilityTypesData.find(
            type => type.id === facility.facility_type_id,
          );

          if (!facilityType) {
            return null;
          };

          return (
            <FacilityCard
              key={facility.id}
              location={location}
              facility={facility}
              facilityType={facilityType}
              latitude={userLocation?.latitude ?? 0}
              longitude={userLocation?.longitude ?? 0}
            />
          );
        });
      })}
    </div>
  );
}
