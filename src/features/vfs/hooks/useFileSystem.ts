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
    setSearchQuery,
    navigateToFolder,
    createFolder,
    addFiles,
    deleteItem,
    resetToDefault,
  };
}