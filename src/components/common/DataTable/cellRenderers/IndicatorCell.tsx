import React from 'react';
import type { CellRendererProps } from '../types';

export const IndicatorCell: React.FC<CellRendererProps> = ({ value }) => {
  // value expected to be a color name or hex
  const color = typeof value === 'string' ? value : 'bg-gray-400';

  const style = typeof value === 'string' && value.startsWith('#') ? { backgroundColor: value } : undefined;

  return (
    <div className="flex items-center">
      <span
        className={`inline-block w-3 h-3 rounded-full ${typeof value === 'string' && !value.startsWith('#') ? value : ''}`}
        style={style}
      />
    </div>
  );
};

export default IndicatorCell;
