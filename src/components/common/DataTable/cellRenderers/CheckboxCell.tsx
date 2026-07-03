import React from 'react';
import type { CheckboxCellProps } from '../types';

export const CheckboxCell: React.FC<CheckboxCellProps> = ({ value, onChange }) => {
  const isChecked = Boolean(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      className="w-4 h-4 accent-blue-600 cursor-pointer"
    />
  );
};

export default CheckboxCell;
