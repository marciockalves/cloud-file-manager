import { Trash2 } from 'lucide-react';
import type { FileNode, FileSystemItem } from '../../features/vfs/types/vfs';
import { FileIcon } from '../common/FileIcon';
import { formatBytes, formatDate } from '../../features/vfs/utils/formatters';


interface FileListProps {
  items: FileSystemItem[];
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FileTable({ items, onNavigate, onDelete }: FileListProps) {
  return (
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
          {items.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
              onClick={() => {
                if (item.type === 'folder') {
                  onNavigate(item.id);
                }
              }}
            >
              <td className="py-3 px-4 flex items-center gap-3">
                <FileIcon type={item.type} name={item.name} className="w-5 h-5" />
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
                    onDelete(item.id);
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
  );
}