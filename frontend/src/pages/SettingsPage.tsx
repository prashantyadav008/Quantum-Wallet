import React, { useState, useEffect } from 'react';
import Typography from '../components/UI/Typography';
import Card from '../components/UI/Card';
import ContainerStatus from '../components/Container/ContainerStatus';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { toast } from 'react-toastify';
import { 
  getContainerStatus,
  startContainer,
  stopContainer
} from '../services/api';
import { ContainerInfo } from '../types';
import { Settings, Info, Shield } from 'lucide-react';

const SettingsPage: React.FC = () => {
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

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Typography variant="h2" className="mb-2">
          Settings
        </Typography>
        <Typography variant="subtitle" className="text-gray-400">
          Configure your Docker container and application settings
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="glass" className="p-6 mb-6">
            <div className="flex items-center mb-6">
              <Settings size={24} className="text-cyber-blue-400 mr-3" />
              <Typography variant="h4">
                Container Settings
              </Typography>
            </div>

            <div className="mb-6">
              <ContainerStatus
                container={container}
                isLoading={isLoading}
                onStart={handleStartContainer}
                onStop={handleStopContainer}
              />
            </div>

            <div className="mt-8">
              <Typography variant="h5" className="mb-4">
                Container Configuration
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Container Name"
                  value="quantum-vault"
                  disabled
                />
                <Input
                  label="Image"
                  value="ubuntu:latest"
                  disabled
                />
                <Input
                  label="Root Storage Path"
                  value="/storage"
                  disabled
                />
                <Input
                  label="Port Mapping"
                  value="3001:3001"
                  disabled
                />
              </div>

              <div className="mt-6">
                <Button 
                  variant="secondary"
                  onClick={() => toast.info('Configuration update coming soon')}
                >
                  Update Configuration
                </Button>
              </div>
            </div>
          </Card>

          <Card variant="glass" className="p-6">
            <div className="flex items-center mb-6">
              <Shield size={24} className="text-cyber-purple-400 mr-3" />
              <Typography variant="h4">
                Application Settings
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Typography variant="subtitle" className="mb-3">
                  Theme Preferences
                </Typography>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="theme" className="accent-cyber-blue-500" checked />
                    <Typography variant="body">Cyberpunk Dark (Default)</Typography>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer opacity-50">
                    <input type="radio" name="theme" className="accent-cyber-blue-500" disabled />
                    <Typography variant="body">Neon Light (Coming Soon)</Typography>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer opacity-50">
                    <input type="radio" name="theme" className="accent-cyber-blue-500" disabled />
                    <Typography variant="body">Matrix Green (Coming Soon)</Typography>
                  </label>
                </div>
              </div>

              <div>
                <Typography variant="subtitle" className="mb-3">
                  File Operations
                </Typography>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="accent-cyber-blue-500" checked />
                    <Typography variant="body">Preserve folder structure on upload</Typography>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="accent-cyber-blue-500" checked />
                    <Typography variant="body">Confirm before deletion</Typography>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="accent-cyber-blue-500" />
                    <Typography variant="body">Auto-unzip archives</Typography>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                variant="primary"
                onClick={() => toast.success('Settings saved')}
              >
                Save Settings
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <Card variant="glass" className="p-6 mb-6">
            <div className="flex items-center mb-4">
              <Info size={20} className="text-cyber-blue-400 mr-2" />
              <Typography variant="h5">
                System Information
              </Typography>
            </div>

            <div className="space-y-3">
              <div>
                <Typography variant="caption" className="text-gray-500">
                  Application Version
                </Typography>
                <Typography variant="body">
                  Quantum Vault v0.1.0
                </Typography>
              </div>
              <div>
                <Typography variant="caption" className="text-gray-500">
                  Docker Version
                </Typography>
                <Typography variant="body">
                  {container ? '20.10.21' : 'Not detected'}
                </Typography>
              </div>
              <div>
                <Typography variant="caption" className="text-gray-500">
                  Backend Status
                </Typography>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyber-green-500 mr-2"></div>
                  <Typography variant="body">
                    Running
                  </Typography>
                </div>
              </div>
              <div>
                <Typography variant="caption" className="text-gray-500">
                  Storage Usage
                </Typography>
                <Typography variant="body">
                  {container ? '23 MB / 10 GB' : '0 MB / 0 GB'}
                </Typography>
              </div>
            </div>
          </Card>

          <Card variant="bordered" className="p-0">
            <div className="p-6">
              <Typography variant="h5" className="mb-4">
                About Quantum Vault
              </Typography>
              <Typography variant="body" className="text-gray-300 mb-4">
                Quantum Vault is a futuristic web-based storage platform that bridges the gap between your local system and Docker containers.
              </Typography>
              <Typography variant="body" className="text-gray-400">
                Created with React, Express.js, and Docker to provide a seamless file management experience with VS Code integration.
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;