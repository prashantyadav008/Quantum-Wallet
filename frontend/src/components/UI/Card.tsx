import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  variant?: 'default' | 'glass' | 'bordered';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  glowing = false,
  variant = 'default'
}) => {
  const baseStyles = 'rounded-lg overflow-hidden';
  
  const variantStyles = {
    default: 'bg-cyber-dark p-4',
    glass: 'glass-panel p-4',
    bordered: 'cyber-border'
  };
  
  const glowEffect = glowing ? 'shadow-neon-blue hover:shadow-neon-purple transition-shadow duration-300' : '';
  
  const classes = twMerge(
    baseStyles,
    variantStyles[variant],
    glowEffect,
    className
  );
  
  if (variant === 'bordered') {
    return (
      <div className={classes}>
        <div className="cyber-border-content">
          {children}
        </div>
      </div>
    );
  }
  
  return <div className={classes}>{children}</div>;
};

export default Card;