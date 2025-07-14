import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Upload, Download, FolderOpen, Settings, Home } from 'lucide-react';
import Typography from '../UI/Typography';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/upload', icon: <Upload size={20} />, label: 'Upload' },
    { path: '/files', icon: <FolderOpen size={20} />, label: 'Files' },
    { path: '/download', icon: <Download size={20} />, label: 'Download' },
    { path: '/terminal', icon: <Terminal size={20} />, label: 'Terminal' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/90 backdrop-blur-md border-b border-cyber-blue-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue-500 to-cyber-purple-500 flex items-center justify-center shadow-neon-blue">
              <Terminal className="text-white" size={20} />
            </div>
            <Typography variant="h4" className="ml-3 text-white" glow>
              QuantumVault
            </Typography>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-2 px-3 rounded-md transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-cyber-blue-500/20 text-cyber-blue-300 shadow-neon-blue'
                    : 'text-gray-400 hover:text-cyber-blue-400 hover:bg-cyber-blue-500/10'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <Typography variant="body" className="font-medium">
                  {item.label}
                </Typography>
              </Link>
            ))}
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="p-2 text-cyber-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;