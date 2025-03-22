import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type CategoryItemProps = {
  label: string;
  Icon: LucideIcon;
  selected?: boolean;
  onClick?: () => void;
};

const CategoryItem = ({ label, Icon, selected, onClick }: CategoryItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 p-3 rounded-lg transition-all',
        selected ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700',
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default CategoryItem;
