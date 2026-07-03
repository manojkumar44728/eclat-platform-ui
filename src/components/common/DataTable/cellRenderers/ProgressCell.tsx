import React from 'react';
import type { ProgressCellProps } from '../types';

export const ProgressCell: React.FC<ProgressCellProps> = ({ value, column }) => {
  const percentage = Math.min(Math.max(Number(value) || 0, 0), 100);

  const getProgressColor = (percent: number): string => {
    if (percent >= 75) return 'bg-green-500';
    if (percent >= 50) return 'bg-blue-500';
    if (percent >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getProgressColor(percentage)} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 min-w-max">
        {percentage}%
      </span>
    </div>
  );
};

export default ProgressCell;
