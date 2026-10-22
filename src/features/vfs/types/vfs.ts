export type ItemType = 'file' | 'folder';

// Propriedades comuns a qualquer item do sistema de arquivos
export interface BaseFileSystemItem {
  id: string;
  name: string;
  parentId: string | null; // null significa que o item está na Raiz (Root)
  createdAt: string;
  updatedAt: string;
}

// Representação de um Arquivo
export interface FileNode extends BaseFileSystemItem {
  type: 'file';
  size: number; // Tamanho em bytes
  mimeType: string; // Ex: 'image/png', 'application/pdf', 'text/plain'
  content?: string | Blob; // Dados textuais ou binários do arquivo
}

// Representação de uma Pasta
export interface FolderNode extends BaseFileSystemItem {
  type: 'folder';
  // Pastas na estrutura plana não precisam de array de filhos; 
  // buscamos os filhos filtrando por `parentId === folder.id`.
}

// União de tipos para qualquer item do sistema
export type FileSystemItem = FileNode | FolderNode;

// Estado geral do nosso VFS para gerenciar a pasta atual aberta e os itens
export interface VfsState {
  items: FileSystemItem[];
  currentFolderId: string | null; // ID da pasta aberta atualmente (null = Raiz)
  selectedItemIds: string[];      // IDs dos itens selecionados na interface
}