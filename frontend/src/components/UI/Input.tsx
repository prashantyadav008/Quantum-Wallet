import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-cyber-blue-100 font-rajdhani mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue-400">
            {icon}
          </div>
        )}
        <input
          className={twMerge(
            "w-full bg-cyber-dark/70 border border-cyber-blue-700 rounded-md py-2 px-4 text-white placeholder-cyber-blue-700 focus:outline-none focus:ring-1 focus:ring-cyber-blue-500 focus:border-cyber-blue-500 transition-all duration-200",
            icon && "pl-10",
            error && "border-cyber-pink-500 focus:ring-cyber-pink-500 focus:border-cyber-pink-500",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-cyber-pink-500">{error}</p>}
    </div>
  );
};

export default Input;