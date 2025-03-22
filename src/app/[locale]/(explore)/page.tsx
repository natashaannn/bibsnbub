// import { createClient } from '@supabase/supabase-js';
import CategoryScroller from '@/components/CategoryScroller';
import FacilityCard from '@/components/FacilityCard';
import SearchBar from '@/components/SearchBar';
import { calculateDistance } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

// Mock user location (Replace with actual geolocation API)
const userLat = 1.3521;
const userLng = 103.8198;

const mockFacilities = [
  {
    id: 1,
    name: 'Moms’ Haven',
    latitude: 1.3521,
    longitude: 103.8198,
    rating: 4.5,
    amenities: {
      hotWater: true,
      changingTable: true,
      sink: true,
      outlet: true,
      wastebasket: true,
      waitingArea: false,
    },
  },
  {
    id: 2,
    name: 'Little Tots Corner',
    latitude: 1.3000,
    longitude: 103.8500,
    rating: 4.2,
    amenities: {
      hotWater: false,
      changingTable: true,
      sink: true,
      outlet: false,
      wastebasket: true,
      waitingArea: true,
    },
  },
];

export default async function Page(props: { params: { locale: string } }) {
  const { locale } = props.params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return (
    <div className="py-5 text-xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('meta_title')}</h1>
        <p className="mt-4">{t('meta_description')}</p>
      </div>

      <SearchBar />
      <CategoryScroller />

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockFacilities.map(facility => (
          <FacilityCard
            key={facility.id}
            name={facility.name}
            distance={calculateDistance(userLat, userLng, facility.latitude, facility.longitude)}
            rating={facility.rating}
            amenities={facility.amenities}
          />
        ))}
      </div>
    </div>
  );
}
