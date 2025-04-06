'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { bottleBaby } from '@lucide/lab';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import { Icon } from 'lucide-react';
import { useState } from 'react';

type Category = {
  name: string;
  label: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  {
    name: 'Diaper Changing Station',
    label: 'Changing',
    icon: <BabyChangingStationIcon fontSize="small" />,
  },
  {
    name: 'Lactation Room',
    label: 'Lactation',
    icon: <Icon iconNode={bottleBaby} className="w-5 h-5" />,
  },
];

type CategoryScrollerProps = {
  onCategorySelect: (category: string | null) => void;
};

const CategoryScroller = ({ onCategorySelect }: CategoryScrollerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onCategorySelect(newCategory);
  };

  return (
    <ScrollArea className="w-full overflow-hidden">
      <div className="flex space-x-6 px-4 py-2">
        {categories.map(category => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-md transition-all',
              selectedCategory === category.name
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700',
            )}
            type="button"
          >
            {category.icon}
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryScroller;
