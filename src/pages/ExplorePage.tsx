import { useState, type DragEvent } from 'react';
import { useFileSystem } from '../features/vfs/hooks/useFileSystem';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Breadcrumbs } from '../features/file-explorer/components/Breadcrumbs';
import { ViewModeToggle, type ViewMode } from '../features/file-explorer/components/ViewModeToggle';

import { getBreadcrumbPath } from '../features/vfs/utils/breadcrumb';
import { formatBytes, formatDate } from '../features/vfs/utils/formatters';
import { Folder, FileText, Trash2, FileCode, FileImage, FileSpreadsheet } from 'lucide-react';
import type { FileNode } from '../features/vfs/types/vfs';
import { DropZoneOverlay } from '../features/file-explorer/components/DropZoneOverLayProps';
import { CreateFolderModal } from '../components/common/CreateFolderModal';

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

  // Função auxiliar para renderizar ícones dinâmicos conforme tipo/extensão
  const renderItemIcon = (type: 'file' | 'folder', mimeType?: string, name?: string) => {
    if (type === 'folder') {
      return <Folder className="w-6 h-6 text-amber-500 shrink-0" />;
    }

    if (mimeType?.startsWith('image/')) {
      return <FileImage className="w-6 h-6 text-purple-500 shrink-0" />;
    }

    if (name?.endsWith('.ts') || name?.endsWith('.tsx') || name?.endsWith('.json')) {
      return <FileCode className="w-6 h-6 text-emerald-500 shrink-0" />;
    }

    if (name?.endsWith('.csv') || name?.endsWith('.xlsx')) {
      return <FileSpreadsheet className="w-6 h-6 text-green-600 shrink-0" />;
    }

    return <FileText className="w-6 h-6 text-blue-500 shrink-0" />;
  };

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
          onNavigateRoot={() => navigateToFolder(null)}
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
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            {searchQuery ? (
              <div className="text-sm font-medium text-gray-700">
                Resultados para: <span className="font-semibold text-blue-600">"{searchQuery}"</span>
              </div>
            ) : (
              <Breadcrumbs path={breadcrumbPath} onNavigate={navigateToFolder} />
            )}

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 font-medium">
                {currentItems.length} {currentItems.length === 1 ? 'item' : 'itens'}
              </span>
              <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>

          {/* Visualização em Grade */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-32"
                >
                  <div
                    className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      if (item.type === 'folder') {
                        navigateToFolder(item.id);
                      }
                    }}
                  >
                    {renderItemIcon(item.type, (item as FileNode).mimeType, item.name)}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </span>
                      {item.type === 'file' && (
                        <span className="text-xs text-gray-400 mt-0.5">
                          {formatBytes((item as FileNode).size)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-400">
                    <span>{formatDate(item.updatedAt)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-all cursor-pointer"
                      title="Excluir item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Visualização em Lista */}
          {viewMode === 'list' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">Tamanho</th>
                    <th className="py-3 px-4">Modificado</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                      onClick={() => {
                        if (item.type === 'folder') {
                          navigateToFolder(item.id);
                        }
                      }}
                    >
                      <td className="py-3 px-4 flex items-center gap-3">
                        {renderItemIcon(item.type, (item as FileNode).mimeType, item.name)}
                        <span className="font-medium text-gray-700">{item.name}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">
                        {item.type === 'file' ? formatBytes((item as FileNode).size) : '--'}
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-xs">
                        {formatDate(item.updatedAt)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(item.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all cursor-pointer inline-block"
                          title="Excluir item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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