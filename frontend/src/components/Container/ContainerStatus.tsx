import React from 'react';
import { ContainerInfo } from '../../types';
import Typography from '../UI/Typography';
import Card from '../UI/Card';
import { Server, Power, PowerOff } from 'lucide-react';
import Button from '../UI/Button';

interface ContainerStatusProps {
  container: ContainerInfo | null;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
}

const ContainerStatus: React.FC<ContainerStatusProps> = ({
  container,
  isLoading,
  onStart,
  onStop,
}) => {
  if (isLoading) {
    return (
      <Card variant="glass\" className="p-4">
        <div className="flex items-center">
          <div className="animate-pulse flex space-x-4 w-full">
            <div className="rounded-full bg-cyber-blue-500/20 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-cyber-blue-500/20 rounded w-3/4"></div>
              <div className="h-4 bg-cyber-blue-500/20 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!container) {
    return (
      <Card variant="glass" className="p-6 text-center">
        <Server size={40} className="mx-auto mb-4 text-gray-500" />
        <Typography variant="subtitle" className="mb-2">
          No Docker container detected
        </Typography>
        <Typography variant="body" className="text-gray-500 mb-4">
          Start a container to manage your files
        </Typography>
        <Button 
          variant="primary"
          onClick={onStart}
          className="mx-auto"
        >
          Start Container
        </Button>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="p-4">
      <div className="flex items-center">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
          container.isRunning 
            ? 'bg-cyber-green-500/20 text-cyber-green-500' 
            : 'bg-cyber-pink-500/20 text-cyber-pink-500'
        }`}>
          <Server size={24} />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <Typography variant="subtitle" className="font-medium">
              {container.name}
            </Typography>
            <div className={`px-2 py-1 rounded-full text-xs ${
              container.isRunning 
                ? 'bg-cyber-green-500/20 text-cyber-green-400' 
                : 'bg-cyber-pink-500/20 text-cyber-pink-400'
            }`}>
              {container.status}
            </div>
          </div>
          <Typography variant="body" className="text-gray-400">
            Image: {container.image}
          </Typography>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        {container.isRunning ? (
          <Button
            variant="danger"
            size="sm"
            onClick={onStop}
            icon={<PowerOff size={16} />}
          >
            Stop Container
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={onStart}
            icon={<Power size={16} />}
          >
            Start Container
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ContainerStatus;