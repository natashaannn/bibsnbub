import { Button } from '@/components/ui/button';
import React from 'react';

type ConfirmationStepProps = {
  formData: any;
  onSubmit: () => void;
};

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ formData, onSubmit }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Confirm Details</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(formData, null, 2)}</pre>
      <Button className="mt-4" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ConfirmationStep;
