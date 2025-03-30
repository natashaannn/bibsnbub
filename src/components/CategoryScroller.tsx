'use client';

import CategoryItem from '@/components/CategoryItem';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Baby, Milk } from 'lucide-react';
import { useState } from 'react';

type Category = {
  label: string;
  Icon: typeof Baby;
  value: string;
};

const categories: Category[] = [
  { label: 'Changing Room', Icon: Baby, value: 'changing' },
  { label: 'Nursing Room', Icon: Milk, value: 'nursing' },
];

type CategoryScrollerProps = {
  onCategorySelect: (category: string | null) => void;
};

const CategoryScroller = ({ onCategorySelect }: CategoryScrollerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string | null) => {
    const newCategory = selectedCategory === category ? null : category; // Toggle selection
    setSelectedCategory(newCategory);
    onCategorySelect(newCategory);
  };

  return (
    <ScrollArea className="w-full overflow-hidden">
      <div className="flex space-x-6 px-4">
        {categories.map(category => (
          <CategoryItem
            key={category.label}
            label={category.label}
            Icon={category.Icon}
            selected={selectedCategory === category.value}
            onClick={() => handleCategoryClick(category.value)}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryScroller;
