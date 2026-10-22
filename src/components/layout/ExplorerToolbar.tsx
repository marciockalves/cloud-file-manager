import { Breadcrumbs } from "../../features/file-explorer/Breadcrumbs";
import { ViewModeToggle, type ViewMode } from "../../features/file-explorer/ViewModeToggle";
import type { BreadcrumbItem } from "../../features/vfs/utils/breadcrumb";


interface ExplorerToolbarProps {
  searchQuery: string;
  breadcrumbPath: BreadcrumbItem[];
  currentItemsCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (folderId: string | null) => void;
}

export function ExplorerToolbar({
  searchQuery,
  breadcrumbPath,
  currentItemsCount,
  viewMode,
  onViewModeChange,
  onNavigate,
}: ExplorerToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
      {/* Lógica condicional encapsulada aqui dentro */}
      {searchQuery ? (
        <div className="text-sm font-medium text-gray-700">
          Resultados para: <span className="font-semibold text-blue-600">"{searchQuery}"</span>
        </div>
      ) : (
        <Breadcrumbs path={breadcrumbPath} onNavigate={onNavigate} />
      )}

      {/* Contador e Alternador de Visualização */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500 font-medium">
          {currentItemsCount} {currentItemsCount === 1 ? 'item' : 'itens'}
        </span>
        <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </div>
    </div>
  );
}