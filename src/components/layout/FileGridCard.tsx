
import { Trash2 } from 'lucide-react';
import type { FileNode, FileSystemItem } from '../../features/vfs/types/vfs';
import { FileIcon } from '../common/FileIcon';
import { formatBytes, formatDate } from '../../features/vfs/utils/formatters';


interface FileGridCardProps {
  item: FileSystemItem;
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FileGridCard({ item, onNavigate, onDelete }: FileGridCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-32">
      <div
        className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
        onClick={() => {
          if (item.type === 'folder') {
            onNavigate(item.id);
          }
        }}
      >
        <FileIcon type={item.type} name={item.name} className="w-6 h-6" />
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
            onDelete(item.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-all cursor-pointer"
          title="Excluir item"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}