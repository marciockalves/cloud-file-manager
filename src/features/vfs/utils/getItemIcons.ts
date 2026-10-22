// src/features/file-explorer/utils/fileIcons.ts (Extensão .ts pura!)
import { Folder, FileText, FileCode, FileImage, FileSpreadsheet, type LucideIcon } from 'lucide-react';

export interface IconConfig {
  icon: LucideIcon;
  color: string;
}

const ICON_MAP: Record<string, IconConfig> = {
  folder: { icon: Folder, color: 'text-amber-500' },
  ts: { icon: FileCode, color: 'text-emerald-500' },
  tsx: { icon: FileCode, color: 'text-emerald-500' },
  json: { icon: FileCode, color: 'text-emerald-600' },
  png: { icon: FileImage, color: 'text-purple-500' },
  jpg: { icon: FileImage, color: 'text-purple-500' },
  jpeg: { icon: FileImage, color: 'text-purple-500' },
  csv: { icon: FileSpreadsheet, color: 'text-green-600' },
  xlsx: { icon: FileSpreadsheet, color: 'text-green-600' },
  default: { icon: FileText, color: 'text-blue-500' },
};

export function getItemIconConfig(type: 'file' | 'folder', name?: string): IconConfig {
  const extension = name?.split('.').pop()?.toLowerCase() ?? '';
  const selectors: Record<string, string> = {
    folder: 'folder',
    file: ICON_MAP[extension] ? extension : 'default',
  };

  const lookupKey = selectors[type] || 'default';
  return ICON_MAP[lookupKey];
}