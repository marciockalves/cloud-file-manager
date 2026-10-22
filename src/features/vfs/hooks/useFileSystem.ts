import { useState, useMemo, useCallback, useEffect } from 'react';
import type { FileSystemItem, FolderNode, FileNode } from '../types/vfs';
import { INITIAL_ITEMS } from '../services/mockData';

const STORAGE_KEY = 'cloud_drive_vfs_data';

export function useFileSystem() {

  const [items, setItems] = useState<FileSystemItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Erro ao carregar o VFS do localStorage:', error);
      }
    }
    return INITIAL_ITEMS;
  });

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [clipboard, setClipboard] = useState<{ type: 'copy' | 'move'; itemId: string } | null>(null);

  const copyItem = (itemId: string) => {
    setClipboard({ type: 'copy', itemId });
  };

  const moveItem = (itemId: string) => {
    setClipboard({ type: 'move', itemId });
  };

  const pasteItem = () => {
    if (!clipboard) return;

    if (clipboard.type === 'move') {
      // Evita mover uma pasta para dentro de si mesma
      if (clipboard.itemId === currentFolderId) return;

      setItems((prev) =>
        prev.map((item) =>
          item.id === clipboard.itemId
            ? { ...item, parentId: currentFolderId, updatedAt: new Date().toISOString() }
            : item
        )
      );
      setClipboard(null); // Limpa o clipboard após mover
    } else if (clipboard.type === 'copy') {
      // Função recursiva para clonar arquivo ou pasta com seus filhos
      const cloneRecursive = (targetId: string, newParentId: string | null): FileSystemItem[] => {
        const original = items.find((i) => i.id === targetId);
        if (!original) return [];

        const newId = crypto.randomUUID();
        const clonedItem: FileSystemItem = {
          ...original,
          id: newId,
          name: `${original.name} (cópia)`,
          parentId: newParentId,
          updatedAt: new Date().toISOString(), // <--- Alterado de Date.now() (number) para string
        };

        let results: FileSystemItem[] = [clonedItem];

        if (original.type === 'folder') {
          const children = items.filter((i) => i.parentId === targetId);
          children.forEach((child) => {
            results = results.concat(cloneRecursive(child.id, newId));
          });
        }

        return results;
      };

      const duplicatedItems = cloneRecursive(clipboard.itemId, currentFolderId);
      setItems((prev) => [...prev, ...duplicatedItems]);
    }
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);


  const currentItems = useMemo(() => {
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return items.filter(item => item.name.toLowerCase().includes(query));
    }
    return items.filter(item => item.parentId === currentFolderId);
  }, [items, currentFolderId, searchQuery]);

  const navigateToFolder = useCallback((folderId: string | null) => {
    setCurrentFolderId(folderId);
    setSearchQuery('');
  }, []);

  const createFolder = useCallback((name: string) => {
    const newFolder: FolderNode = {
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      parentId: currentFolderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setItems(prevItems => [...prevItems, newFolder]);
  }, [currentFolderId]);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newFiles: FileNode[] = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      type: 'file',
      parentId: currentFolderId,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    setItems(prevItems => [...prevItems, ...newFiles]);
  }, [currentFolderId]);

  const deleteItem = useCallback((id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id && item.parentId !== id));
  }, []);

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setItems(INITIAL_ITEMS);
    setCurrentFolderId(null);
    setSearchQuery('');
  }, []);

  return {
    items,
    currentFolderId,
    currentItems,
    searchQuery,
    clipboard,
    setSearchQuery,
    navigateToFolder,
    createFolder,
    addFiles,
    deleteItem,
    resetToDefault,
    copyItem,
    moveItem,
    pasteItem,
    
  };
}