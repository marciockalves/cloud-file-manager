import type { FileSystemItem } from "../types/vfs";


export interface BreadcrumbItem {
  id: string | null;
  name: string;
}

// Função para calcular o caminho de pastas da raiz até a pasta atual
export function getBreadcrumbPath(items: FileSystemItem[], currentFolderId: string | null): BreadcrumbItem[] {
  const path: BreadcrumbItem[] = [{ id: null, name: 'Meu Drive' }];

  if (!currentFolderId) return path;

  const chain: BreadcrumbItem[] = [];
  let currentId: string | null = currentFolderId;

  while (currentId !== null) {
    const folder = items.find(item => item.id === currentId && item.type === 'folder');
    if (!folder) break;

    chain.unshift({ id: folder.id, name: folder.name });
    currentId = folder.parentId;
  }

  return [...path, ...chain];
}