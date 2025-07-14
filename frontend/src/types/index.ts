export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  modifiedDate?: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface UploadConfig {
  targetFolder: string;
  preserveStructure: boolean;
}

export interface ContainerInfo {
  id?: string;
  name?: string;
  status: string;
  startedAt?: string;
  finishedAt?: string;
}

export interface VSCodeConnectionConfig {
  containerName: string;
  folderPath: string;
}