'use client';

import CategoryItem from '@/components/CategoryItem';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Baby, Milk } from 'lucide-react';
import { useState } from 'react';

type Category = {
  label: string;
  Icon: typeof Baby;
};

const categories: Category[] = [
  { label: 'Changing Room', Icon: Baby },
  { label: 'Nursing Room', Icon: Milk },
];

const CategoryScroller = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <ScrollArea className="w-full overflow-hidden">
      <div className="flex space-x-6 px-4">
        {categories.map(category => (
          <CategoryItem
            key={category.label}
            label={category.label}
            Icon={category.Icon}
            selected={selectedCategory === category.label}
            onClick={() => setSelectedCategory(category.label)}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryScroller;
