import type { FileSystemItem } from '../types/vfs';

export const INITIAL_ITEMS: FileSystemItem[] = [
  {
    id: 'folder-1',
    name: 'Documentos de Trabalho',
    type: 'folder',
    parentId: null, // Na raiz
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'folder-2',
    name: 'Imagens de Férias',
    type: 'folder',
    parentId: null, // Na raiz
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'file-1',
    name: 'relatorio-anual.pdf',
    type: 'file',
    parentId: 'folder-1', // Dentro de "Documentos de Trabalho"
    size: 2048576, // 2 MB
    mimeType: 'application/pdf',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'file-2',
    name: 'logo-marca.png',
    type: 'file',
    parentId: 'folder-1',
    size: 512000, // 500 KB
    mimeType: 'image/png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'file-3',
    name: 'praia-sunset.jpg',
    type: 'file',
    parentId: 'folder-2', // Dentro de "Imagens de Férias"
    size: 3145728, // 3 MB
    mimeType: 'image/jpeg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];