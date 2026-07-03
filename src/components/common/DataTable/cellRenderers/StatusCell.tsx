import React from 'react';
import type { StatusCellProps } from '../types';

const statusStyles: Record<string, { bg: string; text: string; badge: string }> = {
  active: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    badge: 'bg-green-200',
  },
  inactive: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    badge: 'bg-gray-200',
  },
  pending: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    badge: 'bg-yellow-200',
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-200',
  },
};

export const StatusCell: React.FC<StatusCellProps> = ({ value }) => {
  const status = value?.toLowerCase() || 'inactive';
  const style = statusStyles[status] || statusStyles.inactive;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${style.badge}`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${style.bg}`}></div>
      <span className={`text-sm font-medium ${style.text}`}>
        {String(value ?? 'N/A')}
      </span>
    </div>
  );
};

export default StatusCell;
