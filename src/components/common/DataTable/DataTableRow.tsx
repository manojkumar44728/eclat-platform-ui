import React from 'react';

import DataTableCell from './DataTableCell';
import type { Column } from './types';

interface DataTableRowProps<T = any> {
  row: T;
  columns: Column<T>[];
  isSelected?: boolean;
  onToggleSelect?: (selected: boolean) => void;
  isSelectable?: boolean;
}

export const DataTableRow: React.FC<DataTableRowProps> = ({
  row,
  columns,
  isSelected,
  onToggleSelect,
  isSelectable,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {isSelectable && (
        <td className="px-4 py-3 w-12">
          <input
            type="checkbox"
            checked={isSelected || false}
            onChange={(e) => onToggleSelect?.(e.target.checked)}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
        </td>
      )}
      {columns.map((column) => (
        <td
          key={column.id}
          className="px-4 py-3"
          style={column.width ? { width: column.width } : undefined}
        >
          <DataTableCell
            column={column}
            row={row}
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
          />
        </td>
      ))}
    </tr>
  );
};

export default DataTableRow;
