import React, { useState } from 'react';
import Typography from '../components/UI/Typography';
import Card from '../components/UI/Card';
import VSCodeConnector from '../components/VSCode/VSCodeConnector';
import { openInVSCode } from '../services/api';
import { VSCodeConnectionConfig } from '../types';
import { toast } from 'react-toastify';
import { FileCode, Terminal, ExternalLink } from 'lucide-react';

const VSCodePage: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const handleConnectVSCode = async (config: VSCodeConnectionConfig) => {
    try {
      setIsConnecting(true);
      await openInVSCode(config.containerName, config.folderPath);
      toast.success('Successfully opened in VS Code');
    } catch (error) {
      console.error('Failed to open in VS Code:', error);
      toast.error('Failed to open in VS Code');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <Typography variant="h2" className="mb-2">
          VS Code Integration
        </Typography>
        <Typography variant="subtitle" className="text-gray-400">
          Connect your Docker container folders to Visual Studio Code
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VSCodeConnector 
            onConnect={handleConnectVSCode}
            isConnecting={isConnecting}
          />
        </div>

        <div>
          <Card variant="glass" className="p-6 mb-6">
            <Typography variant="h5" className="mb-4">
              How It Works
            </Typography>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-cyber-blue-500/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <FileCode size={16} className="text-cyber-blue-400" />
                </div>
                <div>
                  <Typography variant="subtitle" className="mb-1">
                    Container Connection
                  </Typography>
                  <Typography variant="body" className="text-gray-400">
                    Specify the container name and the folder path you want to open
                  </Typography>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-cyber-purple-500/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <Terminal size={16} className="text-cyber-purple-400" />
                </div>
                <div>
                  <Typography variant="subtitle" className="mb-1">
                    Remote Development
                  </Typography>
                  <Typography variant="body" className="text-gray-400">
                    VS Code connects to the container using Remote-Containers extension
                  </Typography>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-cyber-pink-500/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <ExternalLink size={16} className="text-cyber-pink-400" />
                </div>
                <div>
                  <Typography variant="subtitle" className="mb-1">
                    Seamless Editing
                  </Typography>
                  <Typography variant="body" className="text-gray-400">
                    Edit files directly in the container with full IDE features
                  </Typography>
                </div>
              </li>
            </ul>
          </Card>

          <Card variant="bordered" className="p-0">
            <div className="p-6">
              <Typography variant="h5" className="mb-4">
                Requirements
              </Typography>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue-500 mr-2"></div>
                  <Typography variant="body">
                    VS Code installed on your system
                  </Typography>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue-500 mr-2"></div>
                  <Typography variant="body">
                    Remote-Containers extension installed
                  </Typography>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue-500 mr-2"></div>
                  <Typography variant="body">
                    Running Docker container
                  </Typography>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue-500 mr-2"></div>
                  <Typography variant="body">
                    Valid folder path inside container
                  </Typography>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VSCodePage;