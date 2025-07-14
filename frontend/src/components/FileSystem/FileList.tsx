/** @format */

import React, { useState } from "react";
import { FileItem } from "../../types";
import FileIcon from "./FileIcon";
import Typography from "../UI/Typography";
import Card from "../UI/Card";
import { ChevronRight, MoreVertical } from "lucide-react";
import { formatFileSize } from "../../utils/formatters";

export interface FileListProps {
  files: FileItem[];
  onFileClick: (file: FileItem) => void;
  onFolderOpen: (folder: FileItem) => void;
  onFileActionClick: (file: FileItem, action: string) => void;
  onFileSelect: (file: FileItem, isSelected: boolean) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onFileClick,
  onFolderOpen,
  onFileActionClick,
  onFileSelect,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // 👇 Ensure each file has a path fallback (using name)
  const filesWithPath = files.map((file) => ({
    ...file,
    path: file.path || file.name,
  }));

  const toggleDropdown = (filePath: string) => {
    setActiveDropdown(activeDropdown === filePath ? null : filePath);
  };

  const handleItemClick = (file: FileItem) => {
    if (file.type === "folder") {
      onFolderOpen(file);
    } else {
      onFileClick(file);
    }
  };

  const fileActions = [
    { id: "download", label: "Download" },
    { id: "rename", label: "Rename" },
    { id: "delete", label: "Delete" },
  ];

  const folderActions = [
    { id: "open", label: "Open" },
    { id: "vscode", label: "Open in VS Code" },
    { id: "rename", label: "Rename" },
    { id: "delete", label: "Delete" },
  ];

  return (
    <div className="w-full">
      {filesWithPath.length === 0 ? (
        <Card variant="glass" className="p-8 text-center">
          <Typography variant="subtitle" className="text-gray-400">
            No files or folders found in this location
          </Typography>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filesWithPath.map((file) => (
            <Card
              key={file.path}
              variant="glass"
              className="p-0 transition-all duration-300 hover:shadow-neon-blue overflow-visible group">
              <div
                className="p-4 flex items-center cursor-pointer relative"
                onClick={() => handleItemClick(file)}>
                {/* Checkbox for file selection */}
                <input
                  type="checkbox"
                  className="mr-2"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onFileSelect(file, e.target.checked)}
                />

                <div className="mr-3">
                  <FileIcon
                    key={file.name}
                    fileName={file.name}
                    isFolder={file.type === "folder"}
                    className="group-hover:text-cyber-blue-300 transition-colors duration-300"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <Typography
                    variant="subtitle"
                    className="truncate group-hover:text-cyber-blue-300 transition-colors duration-300">
                    {file.name}
                  </Typography>

                  <div className="flex items-center text-gray-500 text-sm">
                    {file.type === "file" && file.size !== undefined && (
                      <span>{formatFileSize(file.size)}</span>
                    )}
                    {file.modifiedDate && (
                      <span className="ml-3">{file.modifiedDate}</span>
                    )}
                  </div>
                </div>

                <div className="ml-2 relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(file.path);
                    }}
                    className="p-2 rounded-full hover:bg-cyber-blue-500/20 text-gray-400 hover:text-cyber-blue-400 transition-colors">
                    <MoreVertical size={16} />
                  </button>

                  {activeDropdown === file.path && (
                    <div className="absolute right-0 top-full mt-2 w-48 glass-panel py-1 rounded-md shadow-neon-blue z-10">
                      {(file.type === "folder"
                        ? folderActions
                        : fileActions
                      ).map((action) => (
                        <button
                          key={action.id}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-cyber-blue-500/20 transition-colors flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onFileActionClick) {
                              onFileActionClick(file, action.id);
                            }
                            setActiveDropdown(null);
                          }}>
                          <Typography variant="body">{action.label}</Typography>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {file.type === "folder" && (
                  <ChevronRight
                    size={18}
                    className="ml-2 text-cyber-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
