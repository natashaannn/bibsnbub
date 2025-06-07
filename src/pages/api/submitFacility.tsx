import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const supabase = await createClient();
  const { formData, userId } = req.body;

  try {
    // Step 1: Check if the location already exists
    const { data: existingLocation, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('address', formData.address)
      .single();

    if (locationError && locationError.code !== 'PGRST116') {
      console.error('Error checking location:', locationError.message);
      return res.status(500).json({ success: false, message: 'Failed to check the location.' });
    }

    let locationId = existingLocation?.id;

    // Step 2: If location does not exist, create a new location
    if (!locationId) {
      const { data: newLocation, error: newLocationError } = await supabase
        .from('locations')
        .insert({
          building: formData.building,
          block: formData.block,
          road: formData.road,
          address: formData.address,
          postal_code: formData.postalCode,
          latitude: formData.latitude,
          longitude: formData.longitude,
        })
        .select('id')
        .single();

      if (newLocationError) {
        console.error('Error creating location:', newLocationError.message);
        return res.status(500).json({ success: false, message: 'Failed to create the location.' });
      }

      locationId = newLocation?.id;
    }

    // Step 3: Insert into the `facilities` table
    const { data: facilityData, error: facilityError } = await supabase
      .from('facilities')
      .insert({
        location_id: locationId,
        facility_type_id: formData.facilityTypeId,
        floor: formData.floor,
        description: formData.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        has_diaper_changing_station: formData.hasDiaperChangingStation,
        has_lactation_room: formData.hasLactationRoom,
        how_to_access: formData.howToAccess,
        females_only: formData.femalesOnly,
        created_by: userId,
      })
      .select('id')
      .single();

    if (facilityError) {
      console.error('Error inserting facility:', facilityError.message);
      return res.status(500).json({ success: false, message: 'Failed to submit the facility.' });
    }

    const facilityId = facilityData?.id;

    // Step 4: Insert into the `facility_amenities` table
    const amenityInserts = formData.amenities.map((amenityId: string) => ({
      facility_id: facilityId,
      amenity_id: amenityId,
      quantity: 1,
    }));

    const { error: amenitiesError } = await supabase
      .from('facility_amenities')
      .insert(amenityInserts);

    if (amenitiesError) {
      console.error('Error inserting facility amenities:', amenitiesError.message);
      return res.status(500).json({ success: false, message: 'Failed to submit the facility amenities.' });
    }

    return res.status(200).json({ success: true, message: 'Facility added successfully!' });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
  }
}
