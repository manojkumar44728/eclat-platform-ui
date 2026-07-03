import React from 'react';
import type { ButtonsCellProps } from '../types';

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
};

export const ButtonsCell: React.FC<ButtonsCellProps> = ({ actions, row }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => action.onClick(row)}
          className={`
            rounded font-medium transition-colors
            ${variantClasses[action.variant || 'primary']}
            ${sizeClasses[action.size || 'md']}
          `}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonsCell;
