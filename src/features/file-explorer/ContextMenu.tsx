import { Copy, FolderInput, ClipboardPaste, Trash2 } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  hasClipboardItem?: boolean;
  onClose: () => void;
  onCopy?: () => void;
  onMove?: () => void;
  onPaste?: () => void;
  onDelete?: () => void;
}

export function ContextMenu({
  x,
  y,
  hasClipboardItem,
  onClose,
  onCopy,
  onMove,
  onPaste,
  onDelete,
}: ContextMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose} />

      <div
        className="absolute z-50 w-48 bg-white rounded-xl border border-gray-200 shadow-xl py-1.5 text-sm text-gray-700"
        style={{ top: y, left: x }}
      >
        {onCopy && (
          <button
            onClick={() => { onCopy(); onClose(); }}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer"
          >
            <Copy className="w-4 h-4 text-gray-500" />
            <span>Copiar</span>
          </button>
        )}

        {onMove && (
          <button
            onClick={() => { onMove(); onClose(); }}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer"
          >
            <FolderInput className="w-4 h-4 text-gray-500" />
            <span>Mover</span>
          </button>
        )}

        {hasClipboardItem && onPaste && (
          <button
            onClick={() => { onPaste(); onClose(); }}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-left cursor-pointer"
          >
            <ClipboardPaste className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-600">Colar aqui</span>
          </button>
        )}

        {(onCopy || onMove || hasClipboardItem) && onDelete && (
          <div className="my-1 border-t border-gray-100" />
        )}

        {onDelete && (
          <button
            onClick={() => { onDelete(); onClose(); }}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors text-left cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Excluir</span>
          </button>
        )}
      </div>
    </>
  );
}