import { LayoutGrid, List } from 'lucide-react';

export type ViewMode = 'grid' | 'list';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
          viewMode === 'grid'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        title="Visualização em Grade"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
          viewMode === 'list'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        title="Visualização em Lista"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}