import { Copy, FolderInput, Trash2 } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onCopy?: () => void;
  onMove?: () => void;
  onDelete?: () => void;
}

export function ContextMenu({ x, y, onClose, onCopy, onMove, onDelete }: ContextMenuProps) {
  return (
    <>
      {/* Backdrop invisível para fechar o menu ao clicar fora */}
      <div className="fixed inset-0 z-50" onClick={onClose} />

      <div
        className="absolute z-50 w-48 bg-white rounded-xl border border-gray-200 shadow-xl py-1.5 text-sm text-gray-700"
        style={{ top: y, left: x }}
      >
        <button
          onClick={() => { onCopy?.(); onClose(); }}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer"
        >
          <Copy className="w-4 h-4 text-gray-500" />
          <span>Copiar para...</span>
        </button>

        <button
          onClick={() => { onMove?.(); onClose(); }}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer"
        >
          <FolderInput className="w-4 h-4 text-gray-500" />
          <span>Mover para...</span>
        </button>

        <div className="my-1 border-t border-gray-100" />

        <button
          onClick={() => { onDelete?.(); onClose(); }}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors text-left cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Excluir</span>
        </button>
      </div>
    </>
  );
}