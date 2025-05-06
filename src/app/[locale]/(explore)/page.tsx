import { createClient } from '@/utils/supabase/server';
import HomePage from './HomePage';

export default async function Page() {
  const supabase = await createClient();

  const [
    { data: locationsData, error: locationsError },
    { data: facilitiesData, error: facilitiesError },
    { data: facilityTypesData, error: facilityTypesError },
  ] = await Promise.all([
    supabase.from('locations').select(),
    supabase.from('facilities').select(),
    supabase.from('facility_types').select(),
  ]);

  if (locationsError || facilitiesError || facilityTypesError) {
    console.error(locationsError ?? facilitiesError ?? facilityTypesError);
    return;
  };

  return (
    <HomePage
      locationsData={locationsData || []}
      facilitiesData={facilitiesData || []}
      facilityTypesData={facilityTypesData || []}
    />
  );
}
