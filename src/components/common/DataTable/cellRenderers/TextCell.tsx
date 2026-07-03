import React from 'react';
import type { CellRendererProps } from '../types';

export const TextCell: React.FC<CellRendererProps> = ({ value }) => {
  return <span>{String(value ?? '')}</span>;
};

export default TextCell;
