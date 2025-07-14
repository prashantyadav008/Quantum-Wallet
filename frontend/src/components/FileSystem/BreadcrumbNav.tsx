import React from 'react';
import { BreadcrumbItem } from '../../types';
import { ChevronRight, Home } from 'lucide-react';
import Typography from '../UI/Typography';

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  onBreadcrumbClick: (item: BreadcrumbItem) => void;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, onBreadcrumbClick }) => {
  return (
    <div className="flex items-center overflow-x-auto py-2 mb-4 scrollbar-thin scrollbar-thumb-cyber-blue-500 scrollbar-track-transparent">
      <button
        onClick={() => onBreadcrumbClick({ name: 'Home', path: '/' })}
        className="flex items-center text-cyber-blue-400 hover:text-cyber-blue-300 transition-colors"
      >
        <Home size={16} />
      </button>

      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronRight size={16} className="mx-2 text-gray-500" />
          <button
            onClick={() => onBreadcrumbClick(item)}
            className={`transition-colors ${
              index === items.length - 1
                ? 'text-white font-medium'
                : 'text-gray-400 hover:text-cyber-blue-400'
            }`}
          >
            <Typography variant="body" className="whitespace-nowrap">
              {item.name}
            </Typography>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadcrumbNav;