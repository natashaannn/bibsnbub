import type { Amenity, FacilityType, Location } from '@/models/types';
import { supabaseStaticClient } from '@/utils/supabase/client';
import { createClient } from '@/utils/supabase/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import FacilityPage from './FacilityPage';

type FacilityPageProps = {
  params: { id: string; locale: string };
};

export async function generateStaticParams() {
  const { data: facilities, error } = await supabaseStaticClient.from('facilities').select('id');

  if (error || !facilities) {
    console.error('Error fetching facilities:', error);
    return [];
  }

  return facilities.flatMap(facility =>
    ['en'].map(locale => ({
      id: facility.id.toString(),
      locale,
    })),
  );
}

export async function generateMetadata(props: FacilityPageProps) {
  const { locale, id } = await props.params;

  const t = await getTranslations({
    locale,
    namespace: 'FacilityPage',
  });

  return {
    title: t('meta_title', { id }),
    description: t('meta_description', { id }),
  };
}

export default async function Page(props: FacilityPageProps) {
  const { locale, id } = await props.params;

  setRequestLocale(locale);

  const supabase = await createClient();

  const facilityQuery = supabase
    .from('facilities')
    .select(`
      id,
      description,
      floor,
      is_accessible,
      has_diaper_changing_station,
      has_lactation_room,
      location:location_id (
        id,
        name,
        address,
        latitude,
        longitude,
        created_at
      ),
      facility_type:facility_type_id (
        id,
        name,
        description
      ),
      facility_amenities:facility_amenities (
        quantity,
        amenity:amenity_id (
          id,
          name,
          description,
          is_multiple_applicable
        )
      )
    `)
    .eq('id', id)
    .single()
    .overrideTypes<{ // Enforce single object due to supabase bug https://github.com/supabase/postgrest-js/issues/546
    location: Location;
    facility_type: FacilityType;
    facility_amenities: {
      quantity: number;
      amenity: Amenity;
    }[];
  }>();

  const { data: facility, error: facilityError } = await facilityQuery;

  if (facilityError) {
    console.error('Error fetching facility details:', facilityError);
    return <div>Failed to load facility details. Please try again later.</div>;
  }

  if (!facility) {
    return <div>Facility not found. It may have been removed or is unavailable.</div>;
  }

  return <FacilityPage facility={facility} />;
}
