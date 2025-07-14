import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  icon,
  ...props
}) => {
  const baseStyles = 'relative overflow-hidden rounded-md font-orbitron transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantStyles = {
    primary: 'cyber-button',
    secondary: 'bg-cyber-purple-500 hover:bg-cyber-purple-400 text-white hover:shadow-neon-purple focus:ring-cyber-purple-400',
    outline: 'bg-transparent border border-cyber-blue-500 text-cyber-blue-400 hover:text-white hover:bg-cyber-blue-500/20 hover:shadow-neon-blue focus:ring-cyber-blue-400',
    danger: 'bg-cyber-pink-500 hover:bg-cyber-pink-400 text-white hover:shadow-neon-pink focus:ring-cyber-pink-400'
  };

  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-6 text-base',
    lg: 'py-3 px-8 text-lg'
  };

  const classes = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <button className={classes} {...props}>
      <span className="relative z-10 flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default Button;