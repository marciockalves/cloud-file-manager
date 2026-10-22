import { Folder, HardDrive, Plus } from 'lucide-react';

interface SidebarProps {
  onNavigateRoot: () => void;
  onCreateFolderClick: () => void;
}

export function Sidebar({ onNavigateRoot, onCreateFolderClick }: SidebarProps) {
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
            Pastas Rápidas
          </div>
          <div className="space-y-0.5 pl-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200/40 cursor-pointer">
              <Folder className="w-4 h-4 text-amber-500" />
              <span className="truncate">Documentos</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200/40 cursor-pointer">
              <Folder className="w-4 h-4 text-amber-500" />
              <span className="truncate">Imagens</span>
            </div>
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