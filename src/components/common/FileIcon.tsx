import { getItemIconConfig } from "../../features/vfs/utils/getItemIcons";


interface FileIconProps {
  type: 'file' | 'folder';
  name?: string;
  className?: string;
}

export function FileIcon({ type, name, className = 'w-6 h-6' }: FileIconProps) {
  const { icon: IconComponent, color } = getItemIconConfig(type, name);

  return <IconComponent className={`${className} ${color} shrink-0`} />;
}