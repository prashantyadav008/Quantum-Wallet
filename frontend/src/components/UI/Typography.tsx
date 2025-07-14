import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle' | 'body' | 'caption' | 'code';
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  color?: string;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  className,
  glow = false,
  color
}) => {
  const baseStyles = {
    h1: 'text-4xl font-orbitron font-bold leading-tight',
    h2: 'text-3xl font-orbitron font-bold leading-tight',
    h3: 'text-2xl font-orbitron font-semibold',
    h4: 'text-xl font-orbitron font-semibold',
    h5: 'text-lg font-orbitron font-medium',
    h6: 'text-base font-orbitron font-medium',
    subtitle: 'text-lg font-rajdhani font-medium',
    body: 'text-base font-rajdhani leading-relaxed',
    caption: 'text-sm font-rajdhani',
    code: 'font-mono text-sm bg-cyber-dark/50 px-1 py-0.5 rounded'
  };

  const glowEffect = glow ? 'cyber-glow' : '';
  const colorClass = color || '';

  const classes = twMerge(baseStyles[variant], glowEffect, colorClass, className);

  const Component = 
    variant === 'h1' ? 'h1' :
    variant === 'h2' ? 'h2' :
    variant === 'h3' ? 'h3' :
    variant === 'h4' ? 'h4' :
    variant === 'h5' ? 'h5' :
    variant === 'h6' ? 'h6' :
    variant === 'subtitle' ? 'h6' :
    variant === 'caption' ? 'small' :
    variant === 'code' ? 'code' : 'p';

  return <Component className={classes}>{children}</Component>;
};

export default Typography;