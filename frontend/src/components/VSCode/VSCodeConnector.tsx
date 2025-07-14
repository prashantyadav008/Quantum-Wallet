import React, { useState } from 'react';
import { VSCodeConnectionConfig } from '../../types';
import Card from '../UI/Card';
import Typography from '../UI/Typography';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { FileCode, Folder } from 'lucide-react';

interface VSCodeConnectorProps {
  onConnect: (config: VSCodeConnectionConfig) => void;
  isConnecting: boolean;
}

const VSCodeConnector: React.FC<VSCodeConnectorProps> = ({
  onConnect,
  isConnecting,
}) => {
  const [containerName, setContainerName] = useState<string>('');
  const [folderPath, setFolderPath] = useState<string>('');

  const handleConnect = () => {
    if (!containerName || !folderPath) return;
    onConnect({ containerName, folderPath });
  };

  return (
    <Card variant="glass" className="p-6">
      <div className="mb-6 text-center">
        <div className="mx-auto w-16 h-16 bg-cyber-purple-500/20 rounded-full flex items-center justify-center mb-4">
          <FileCode size={32} className="text-cyber-purple-400" />
        </div>
        <Typography variant="h4" className="mb-2">
          Connect to VS Code
        </Typography>
        <Typography variant="body" className="text-gray-400">
          Open container folders directly in Visual Studio Code
        </Typography>
      </div>

      <div className="space-y-4">
        <Input
          label="Container Name"
          placeholder="Enter container name"
          value={containerName}
          onChange={(e) => setContainerName(e.target.value)}
          icon={<FileCode size={18} />}
        />

        <Input
          label="Folder Path"
          placeholder="Enter folder path inside container"
          value={folderPath}
          onChange={(e) => setFolderPath(e.target.value)}
          icon={<Folder size={18} />}
        />

        <Button
          variant="primary"
          className="w-full mt-4"
          onClick={handleConnect}
          disabled={isConnecting || !containerName || !folderPath}
        >
          {isConnecting ? 'Connecting...' : 'Connect to VS Code'}
        </Button>
      </div>
    </Card>
  );
};

export default VSCodeConnector;