/** @format */

import React from "react";
import {
  File,
  FileText,
  FileImage,
  FileCode,
  FileJson,
  File as FilePdf,
  FileArchive,
  FileAudio,
  FileVideo,
  Folder,
  FileSpreadsheet,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

interface FileIconProps {
  fileName: string;
  isFolder: boolean;
  size?: number;
  className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({
  fileName,
  isFolder,
  size = 24,
  className,
}) => {
  if (isFolder) {
    return (
      <Folder
        size={size}
        className={twMerge("text-cyber-blue-400", className)}
      />
    );
  }

  // Get file extension
  const extension =
    typeof fileName === "string" && fileName.includes(".")
      ? fileName.split(".").pop()?.toLowerCase() || ""
      : "";

  // Choose icon based on file extension
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
    case "webp":
      return (
        <FileImage
          size={size}
          className={twMerge("text-cyber-purple-400", className)}
        />
      );
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "html":
    case "css":
    case "scss":
    case "php":
    case "py":
    case "java":
    case "c":
    case "cpp":
    case "go":
    case "rs":
      return (
        <FileCode
          size={size}
          className={twMerge("text-cyber-green-400", className)}
        />
      );
    case "json":
    case "yaml":
    case "yml":
    case "toml":
    case "xml":
      return (
        <FileJson
          size={size}
          className={twMerge("text-cyber-pink-400", className)}
        />
      );
    case "pdf":
      return (
        <FilePdf
          size={size}
          className={twMerge("text-cyber-pink-500", className)}
        />
      );
    case "zip":
    case "rar":
    case "tar":
    case "gz":
    case "7z":
      return (
        <FileArchive
          size={size}
          className={twMerge("text-cyber-purple-500", className)}
        />
      );
    case "mp3":
    case "wav":
    case "ogg":
    case "flac":
      return (
        <FileAudio
          size={size}
          className={twMerge("text-cyber-blue-500", className)}
        />
      );
    case "mp4":
    case "avi":
    case "mov":
    case "webm":
    case "mkv":
      return (
        <FileVideo
          size={size}
          className={twMerge("text-cyber-purple-400", className)}
        />
      );
    case "xls":
    case "xlsx":
    case "csv":
      return (
        <FileSpreadsheet
          size={size}
          className={twMerge("text-cyber-green-500", className)}
        />
      );
    case "txt":
    case "md":
      return (
        <FileText size={size} className={twMerge("text-gray-400", className)} />
      );
    default:
      return (
        <File size={size} className={twMerge("text-gray-400", className)} />
      );
  }
};

export default FileIcon;
