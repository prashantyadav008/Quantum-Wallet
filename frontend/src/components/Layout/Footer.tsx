import React from 'react';
import Typography from '../UI/Typography';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-dark/80 border-t border-cyber-blue-700/30 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Typography variant="body" className="text-gray-400">
              © {new Date().getFullYear()} QuantumVault. All rights reserved.
            </Typography>
          </div>
          
          <div className="flex items-center space-x-4">
            <Typography variant="body" className="text-gray-400 flex items-center">
              Made with <Heart size={16} className="mx-1 text-cyber-pink-500" /> using React & Docker
            </Typography>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyber-blue-400 hover:text-cyber-blue-300 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;