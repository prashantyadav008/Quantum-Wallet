import axios from 'axios';
import { FileItem, ContainerInfo } from '../types';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// File operations
export const fetchFolders = async (): Promise<FileItem[]> => {
  try {
    const response = await api.get("/api/list");
    // Server returns: { folders: ["folder1", "folder2", ...] }
    return response.data.folders.map((name: string) => ({ name }));
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

export const fetchFiles = async (folder: string): Promise<FileItem[]> => {
  try {
    const response = await api.get(`/api/list/${encodeURIComponent(folder)}`);
    // Server returns: { files: ["file1.txt", "file2.jpg", ...] }
    return response.data.files.map((name: string) => ({ name }));
  } catch (error) {
    console.error(`Error fetching files in folder "${folder}":`, error);
    throw error;
  }
};



export const downloadFolder = async (folder: string): Promise<Blob> => {
  try {
    const response = await api.get(`/api/download-folder/${encodeURIComponent(folder)}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading folder:', error);
    throw error;
  }
};


export const downloadMultipleFiles = async (
  folder: string,
  files: string[]
): Promise<Blob> => {
  try {
    const query = files.map(f => `files=${encodeURIComponent(f)}`).join('&');
    const response = await api.get(
      `/api/download-files/${encodeURIComponent(folder)}?${query}`,
      {
        responseType: 'blob',
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error downloading multiple files:', error);
    throw error;
  }
};

export const uploadFiles = async (
  files: File[],
  targetFolder: string
): Promise<void> => {
  try {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('targetFolder', targetFolder);

    await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

export const deleteFiles = async (folder: string, files: string[]): Promise<void> => {
  try {
    await api.delete(`/api/delete-files/${encodeURIComponent(folder)}`, {
      data: { files }
    });
  } catch (error) {
    console.error('Error deleting files:', error);
    throw error;
  }
};

// Container operations
export const getContainerStatus = async (): Promise<ContainerInfo> => {
  try {
    const response = await api.get("/container/status");
    return response.data;
  } catch (error) {
    console.error("Error fetching container status:", error);
    throw error;
  }
};


export const startContainer = async (): Promise<{ message: string }> => {
  try {
    const response = await api.post('/container/start');
    return response.data;
  } catch (error) {
    console.error('Error starting container:', error);
    throw error;
  }
};



export const stopContainer = async (): Promise<{ message: string }> => {
  try {
    const response = await api.post('/container/stop');
    return response.data;
  } catch (error) {
    console.error('Error stopping container:', error);
    throw error;
  }
};


export const getContainerInfo = async (): Promise<ContainerInfo> => {
  try {
    const response = await api.get('/container/info');
    return response.data;
  } catch (error) {
    console.error('Error fetching container info:', error);
    throw error;
  }
};



// VS Code integration
export const openInVSCode = async (containerName: string, folderPath: string): Promise<void> => {
  try {
    await api.post('/vscode/open', { containerName, folderPath });
  } catch (error) {
    console.error('Error opening VS Code:', error);
    throw error;
  }
};

export default api;