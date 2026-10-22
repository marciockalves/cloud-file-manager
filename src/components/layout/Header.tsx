import { Search, HardDrive } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
          <HardDrive className="w-5 h-5" />
        </div>
        <span className="font-bold text-gray-800 text-lg tracking-tight">
          Cloud Drive
        </span>
      </div>

      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar em todos os arquivos e pastas..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100/80 hover:bg-gray-100 border border-transparent focus:border-blue-500 focus:bg-white rounded-xl text-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm">
          ED
        </div>
      </div>
    </header>
  );
}