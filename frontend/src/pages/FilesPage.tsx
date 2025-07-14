/** @format */

import React, { useState, useEffect } from "react";
import Typography from "../components/UI/Typography";
import FileList from "../components/FileSystem/FileList";
import Card from "../components/UI/Card";
import { FileItem } from "../types";
import {
  fetchFiles,
  downloadFolder,
  downloadMultipleFiles,
} from "../services/api";
import { toast } from "react-toastify";
import { Download, Search } from "lucide-react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const FilesPage: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [folderName, setFolderName] = useState<string>("");

  const loadFiles = async (path: string) => {
    try {
      console.log("path", path);
      setIsLoading(true);
      const fileList = await fetchFiles(path);
      setFiles(fileList);
    } catch (error) {
      console.error("Failed to load files:", error);
      if (!isInitialLoad) {
        toast.error("Failed to load files");
      }
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  const handleViewFiles = () => {
    console.log("Viewing files for path:", currentPath, folderName);
    if (!folderName.trim()) {
      toast.info("Please enter a folder name");
      return;
    }
    setCurrentPath(`${folderName}`);
  };

  const handleFolderDownload = async (folder: FileItem) => {
    try {
      const blob = await downloadFolder(folder.name);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${folder.name}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`Folder "${folder.name}" downloaded`);
    } catch (error) {
      console.error("Failed to download folder:", error);
      toast.error("Failed to download folder");
    }
  };

  const handleFileDownload = async (file: FileItem) => {
    try {
      const blob = await downloadMultipleFiles(currentPath, [file.name]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`Downloaded ${file.name}`);
    } catch (error) {
      console.error("Failed to download file:", error);
      toast.error("Failed to download file");
    }
  };

  const handleMultipleDownload = async () => {
    if (selectedFiles.length === 0) {
      toast.info("No files selected");
      return;
    }

    try {
      const blob = await downloadMultipleFiles(currentPath, selectedFiles);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `selected_files.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`Selected files downloaded`);
    } catch (error) {
      console.error("Failed to download selected files:", error);
      toast.error("Failed to download selected files");
    }
  };

  const handleFileSelect = (file: FileItem, isSelected: boolean) => {
    setSelectedFiles((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, file.name];
      } else {
        return prevSelected.filter((name) => name !== file.name);
      }
    });
  };

  useEffect(() => {
    if (currentPath) loadFiles(currentPath);
  }, [currentPath]);

  const filteredFiles = searchQuery
    ? files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : files;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Typography variant="h2" className="mb-2">
          Files Explorer
        </Typography>
        <Typography variant="subtitle" className="text-gray-400">
          Browse and manage files in your Docker container
        </Typography>
      </div>

      <Card variant="glass" className="p-6 mb-8">
        {/* 🔥 Add input field and view button */}
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <Input
            type="text"
            placeholder="Enter folder name..."
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Button onClick={handleViewFiles}>View Files</Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
          <div className="flex gap-2 mt-4 md:mt-0">
            <Input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              className="mb-0"
            />
            <Button onClick={handleMultipleDownload}>
              <Download size={18} className="mr-2" />
              Download Selected
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-20 bg-cyber-blue-500/10 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <FileList
            files={filteredFiles}
            onFileClick={handleFileDownload}
            onFolderOpen={(folder) => setCurrentPath(folder.path)}
            onFileActionClick={(file, action) => {
              if (action === "download") handleFileDownload(file);
              if (action === "folderDownload") handleFolderDownload(file);
            }}
            onFileSelect={handleFileSelect}
          />
        )}
      </Card>
    </div>
  );
};

export default FilesPage;
