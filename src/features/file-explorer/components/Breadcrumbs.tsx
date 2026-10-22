import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '../../vfs/utils/breadcrumb';


interface BreadcrumbsProps {
  path: BreadcrumbItem[];
  onNavigate: (folderId: string | null) => void;
}

export function Breadcrumbs({ path, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm font-medium text-gray-600">
      {path.map((item, index) => {
        const isLast = index === path.length - 1;

        return (
          <div key={item.id ?? 'root'} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
            <button
              onClick={() => onNavigate(item.id)}
              disabled={isLast}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                isLast
                  ? 'text-gray-900 font-semibold bg-gray-100 cursor-default'
                  : 'hover:bg-gray-200/60 text-gray-600'
              }`}
            >
              {index === 0 && <Home className="w-4 h-4 text-blue-600" />}
              <span>{item.name}</span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}