/** @format */

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import Button from "../UI/Button";
import Typography from "../UI/Typography";
import Input from "../UI/Input";
import Card from "../UI/Card";
import { formatFileSize } from "../../utils/formatters";

interface UploadAreaProps {
  onUpload: (files: File[], targetFolder: string) => void;
}

interface FileWithPreview extends File {
  preview?: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [targetFolder, setTargetFolder] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      const fileToRemove = newFiles[index];

      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUpload = () => {
    if (files.length === 0 || !targetFolder.trim()) return;

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      onUpload(files, targetFolder);

      // Clean up previews
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });

      setFiles([]);
      setTargetFolder("");
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <Input
          type="text"
          value={targetFolder}
          onChange={(e) => setTargetFolder(e.target.value)}
          label="Target Folder Path"
          placeholder="Enter the folder name"
          icon={<File size={18} />}
        />
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragActive
            ? "border-cyber-blue-400 bg-cyber-blue-500/10"
            : "border-gray-700 hover:border-cyber-blue-600 hover:bg-cyber-blue-500/5"
        }`}>
        <input {...getInputProps()} />
        <Upload
          className={`mx-auto mb-4 ${
            isDragActive ? "text-cyber-blue-400" : "text-gray-500"
          }`}
          size={40}
        />
        <Typography variant="subtitle" className="mb-2 text-gray-300">
          {isDragActive
            ? "Drop the files here"
            : "Drag & drop files or folders here"}
        </Typography>
        <Typography variant="body" className="text-gray-500 mb-4">
          Or click to browse your file system
        </Typography>
        <Button variant="outline" size="sm" type="button" className="mx-auto">
          Select Files
        </Button>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="subtitle">
              Selected Files ({files.length})
            </Typography>
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={isUploading || !targetFolder.trim()}>
              {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <Card key={index} variant="glass" className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center overflow-hidden">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                    ) : (
                      <File className="w-10 h-10 p-2 rounded bg-cyber-dark mr-3 text-cyber-blue-400" />
                    )}
                    <div className="min-w-0">
                      <Typography
                        variant="body"
                        className="truncate font-medium">
                        {file.name}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        {formatFileSize(file.size)}
                      </Typography>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-2 p-1.5 rounded-full hover:bg-cyber-pink-500/20 text-gray-400 hover:text-cyber-pink-500 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
