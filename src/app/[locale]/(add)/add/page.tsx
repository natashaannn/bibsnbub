import { createClient } from '@/utils/supabase/server';
import AddFacilityPage from './AddFacilityPage';

export default async function Page() {
  const supabase = await createClient();

  // Fetch facility types and amenities
  const { data: facilityTypes, error: facilityTypesError } = await supabase
    .from('facility_types')
    .select('id, name');

  const { data: amenities, error: amenitiesError } = await supabase
    .from('amenities')
    .select('id, name');

  if (facilityTypesError || amenitiesError) {
    console.error('Error fetching data:', facilityTypesError || amenitiesError);
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <AddFacilityPage
      facilityTypes={facilityTypes || []}
      amenities={amenities || []}
    />
  );
}
