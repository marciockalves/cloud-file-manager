import { useState, type DragEvent } from 'react';
import { useFileSystem } from '../features/vfs/hooks/useFileSystem';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { type ViewMode } from '../features/file-explorer/ViewModeToggle';


import { getBreadcrumbPath } from '../features/vfs/utils/breadcrumb';
import { Folder } from 'lucide-react';
import { DropZoneOverlay } from '../features/file-explorer/DropZoneOverLayProps';
import { CreateFolderModal } from '../components/common/CreateFolderModal';
import { ExplorerToolbar } from '../components/layout/ExplorerToolbar';
import { FileGridCard } from '../components/layout/FileGridCard';
import { FileTable } from '../components/layout/FileTable';

export function ExplorerPage() {
  const {
    items,
    currentFolderId,
    currentItems,
    searchQuery,
    setSearchQuery,
    navigateToFolder,
    createFolder,
    addFiles,
    deleteItem,
  } = useFileSystem();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const breadcrumbPath = getBreadcrumbPath(items, currentFolderId);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          items={items}
          onNavigateRoot={() => navigateToFolder(null)}
          onNavigateFolder={navigateToFolder}
          onCreateFolderClick={() => setIsCreateModalOpen(true)}
        />

        <main
          className="relative flex-1 flex flex-col p-6 overflow-y-auto bg-gray-50/30"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <DropZoneOverlay isDragging={isDragging} />

          {/* Barra Superior */}
          <ExplorerToolbar
            searchQuery={searchQuery}
            breadcrumbPath={breadcrumbPath}
            currentItemsCount={currentItems.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onNavigate={navigateToFolder}
          />

          {/* Visualização em Grade */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItems.map((item) => (
                <FileGridCard
                  key={item.id}
                  item={item}
                  onNavigate={navigateToFolder}
                  onDelete={deleteItem}
                />
              ))}
            </div>
          )}


          {/* Visualização em Lista */}
          {viewMode === 'list' && (
            <FileTable
              items={currentItems}
              onNavigate={navigateToFolder}
              onDelete={deleteItem}
            />
          )}

          {currentItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Folder className="w-12 h-12 stroke-1 mb-2" />
              <p className="text-sm">Nenhum item encontrado.</p>
            </div>
          )}
        </main>
      </div>

      <CreateFolderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateFolder={createFolder}
      />
    </div>
  );
}