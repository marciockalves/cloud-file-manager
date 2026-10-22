import { Folder, HardDrive, Plus } from 'lucide-react';
import type { FileSystemItem } from '../../features/vfs/types/vfs';


interface SidebarProps {
  items: FileSystemItem[]; // Lista completa ou filtrada de itens do VFS
  onNavigateRoot: () => void;
  onNavigateFolder: (folderId: string) => void; // Nova prop para navegar para a pasta clicada
  onCreateFolderClick: () => void;
}

export function Sidebar({
  items,
  onNavigateRoot,
  onNavigateFolder,
  onCreateFolderClick,
}: SidebarProps) {

  const folders = items.filter((item) => item.type === 'folder');

  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50/50 p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Botão de Ação Principal (Novo) */}
        <button
          onClick={onCreateFolderClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>Nova Pasta</span>
        </button>

        {/* Links de Navegação Lateral */}
        <nav className="space-y-1">
          <button
            onClick={onNavigateRoot}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200/60 transition-colors cursor-pointer"
          >
            <HardDrive className="w-4 h-4 text-blue-600" />
            <span>Meu Drive</span>
          </button>
          
          <div className="pt-2 pb-1 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Minhas Pastas
          </div>
          
          {/* Lista Dinâmica de Pastas do LocalStorage / VFS */}
          <div className="space-y-0.5 pl-2 max-h-60 overflow-y-auto">
            {folders.length === 0 ? (
              <p className="px-3 py-2 text-xs text-gray-400 italic">Nenhuma pasta criada</p>
            ) : (
              folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => onNavigateFolder(folder.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200/40 text-left transition-colors cursor-pointer"
                >
                  <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="truncate">{folder.name}</span>
                </button>
              ))
            )}
          </div>
        </nav>
      </div>

      {/* Armazenamento Usado (Mock Visual) */}
      <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm space-y-2">
        <div className="flex justify-between text-xs font-medium text-gray-600">
          <span>Armazenamento</span>
          <span>5.5 MB / 15 GB</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full w-[15%]" />
        </div>
      </div>
    </aside>
  );
}