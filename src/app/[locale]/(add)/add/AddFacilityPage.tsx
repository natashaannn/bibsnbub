'use client';

import NavigationButtons from '@/components/NavigationButtons';
import ProgressBar from '@/components/ProgressBar';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import AddFacilityDetails from './steps/AddFacilityDetails';
import ConfirmationStep from './steps/ConfirmationStep';
import SelectAmenities from './steps/SelectAmenities';
import SelectFacilityType from './steps/SelectFacilityType';
import SelectLocation from './steps/SelectLocation';

type AddFacilityPageProps = {
  facilityTypes: { id: string; name: string }[];
  amenities: { id: string; name: string }[];
};

export default function AddFacilityPage({ amenities, facilityTypes }: AddFacilityPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amenities: [] as string[],
    facilityTypeId: '',
    building: '',
    block: '',
    road: '',
    address: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    floor: '',
    description: '',
    hasDiaperChangingStation: false,
    hasLactationRoom: false,
    howToAccess: '',
    femalesOnly: false,
  });

  const { isSignedIn, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to the sign-in page
    }
  }, [isSignedIn, router]);

  const handleFinalSubmit = async () => {
    if (!userId) {
      toast.error('User ID is required to submit the form.');
      return;
    }

    try {
      const response = await fetch('/api/submitFacility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, userId }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.warning(result.message);
      }
    } catch (err) {
      console.error('Error submitting facility:', err);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SelectFacilityType facilityTypeId={formData.facilityTypeId} setFacilityTypeId={id => setFormData(prev => ({ ...prev, facilityTypeId: id }))} facilityTypes={facilityTypes} />;
      case 2:
        return <SelectLocation formData={formData} setFormData={setFormData} />;
      case 3:
        return <AddFacilityDetails formData={formData} setFormData={setFormData} />;
      case 4:
        return <SelectAmenities formData={formData} setFormData={setFormData} amenities={amenities} />;
      case 5:
        return <ConfirmationStep formData={formData} onSubmit={handleFinalSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Facility</h1>
      <ProgressBar currentStep={step} totalSteps={5} />
      {renderStep()}
      <NavigationButtons
        currentStep={step}
        totalSteps={5}
        onNext={() => setStep(prev => prev + 1)}
        onBack={() => setStep(prev => prev - 1)}
      />
    </div>
  );
}
