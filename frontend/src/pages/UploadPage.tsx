import React, { useState, useEffect } from 'react';
import Typography from '../components/UI/Typography';
import UploadArea from '../components/FileSystem/UploadArea';
import Card from '../components/UI/Card';
import ContainerStatus from '../components/Container/ContainerStatus';
import { toast } from 'react-toastify';
import { 
  uploadFiles,
  getContainerStatus,
  startContainer,
  stopContainer
} from '../services/api';
import { ContainerInfo } from '../types';

const UploadPage: React.FC = () => {
  const [container, setContainer] = useState<ContainerInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchContainerStatus();
  }, []);

  const fetchContainerStatus = async () => {
    try {
      setIsLoading(true);
      const status = await getContainerStatus();
      setContainer(status);
    } catch (error) {
      console.error('Failed to fetch container status:', error);
      setContainer(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartContainer = async () => {
    try {
      setIsLoading(true);
      const status = await startContainer();
      setContainer(status);
      toast.success('Container started successfully');
    } catch (error) {
      console.error('Failed to start container:', error);
      toast.error('Failed to start container');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopContainer = async () => {
    try {
      setIsLoading(true);
      const status = await stopContainer();
      setContainer(status);
      toast.success('Container stopped successfully');
    } catch (error) {
      console.error('Failed to stop container:', error);
      toast.error('Failed to stop container');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (files: File[], targetFolder: string) => {
    try {
      await uploadFiles(files, targetFolder);
      toast.success(`${files.length} files uploaded successfully`);
    } catch (error) {
      console.error('Failed to upload files:', error);
      toast.error('Failed to upload files');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Typography variant="h2" className="mb-2">
          Upload Files
        </Typography>
        <Typography variant="subtitle" className="text-gray-400">
          Upload files and folders to your Docker container
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="glass" className="p-6">
            <UploadArea onUpload={handleUpload} />
          </Card>
        </div>

        <div>
          <div className="mb-6">
            <Typography variant="h4" className="mb-4">
              Container Status
            </Typography>
            <ContainerStatus
              container={container}
              isLoading={isLoading}
              onStart={handleStartContainer}
              onStop={handleStopContainer}
            />
          </div>

          <Card variant="glass" className="p-6">
            <Typography variant="h5" className="mb-4">
              Upload Tips
            </Typography>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-cyber-blue-500 text-white text-xs flex items-center justify-center mr-2 mt-1">1</span>
                <Typography variant="body">
                  Specify a target folder path where files will be stored in the container
                </Typography>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-cyber-blue-500 text-white text-xs flex items-center justify-center mr-2 mt-1">2</span>
                <Typography variant="body">
                  Drag and drop files or folders to upload multiple items at once
                </Typography>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-cyber-blue-500 text-white text-xs flex items-center justify-center mr-2 mt-1">3</span>
                <Typography variant="body">
                  Original folder structure will be preserved inside the container
                </Typography>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-cyber-blue-500 text-white text-xs flex items-center justify-center mr-2 mt-1">4</span>
                <Typography variant="body">
                  Ensure the container is running before uploading files
                </Typography>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;