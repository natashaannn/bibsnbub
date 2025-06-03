'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  amenities: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You must select at least one amenity.',
  }),
});

type SelectAmenitiesProps = {
  formData: {
    amenities: string[];
  };
  setFormData: (data: any) => void;
  amenities: { id: string; name: string }[];
};

const SelectAmenities: React.FC<SelectAmenitiesProps> = ({ formData, setFormData, amenities }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amenities: formData.amenities || [],
    },
  });

  const handleCheckboxChange = (checked: boolean, amenityId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter((value: string) => value !== amenityId),
    }));
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="amenities"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Select Amenities</FormLabel>
                <FormDescription>
                  Choose the amenities available at the facility.
                </FormDescription>
              </div>
              {amenities.map(amenity => (
                <FormItem
                  key={amenity.id}
                  className="flex flex-row items-center gap-2"
                >
                  <FormControl>
                    <Checkbox
                      checked={formData.amenities.includes(amenity.id)}
                      onCheckedChange={checked => handleCheckboxChange(!!checked, amenity.id)}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {amenity.name}
                  </FormLabel>
                </FormItem>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SelectAmenities;
