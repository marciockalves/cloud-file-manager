import { UploadCloud } from 'lucide-react';

interface DropZoneOverlayProps {
  isDragging: boolean;
}

export function DropZoneOverlay({ isDragging }: DropZoneOverlayProps) {
  if (!isDragging) return null;

  return (
    <div className="absolute inset-0 z-40 bg-blue-600/10 backdrop-blur-xs border-2 border-dashed 
    border-blue-500 rounded-2xl flex flex-col 
    items-center justify-center p-6 
    transition-all pointer-events-none">
      <div className="bg-white p-4 rounded-2xl shadow-xl flex 
      flex-col items-center gap-3 
      border border-blue-100 animate-bounce">
        <UploadCloud className="w-12 h-12 text-blue-600" />
        <div className="text-center">
          <p className="text-base font-semibold text-gray-800">Solte os arquivos para fazer upload</p>
          <p className="text-xs text-gray-500">Eles serão salvos no diretório atual</p>
        </div>
      </div>
    </div>
  );
}