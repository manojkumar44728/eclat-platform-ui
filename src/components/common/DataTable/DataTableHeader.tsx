import React from 'react';
import type { Column } from './types';

interface DataTableHeaderProps<T = any> {
  columns: Column<T>[];
  onSort?: (columnId: string) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isSelectable?: boolean;
  isAllSelected?: boolean;
  isSomeSelected?: boolean;
  onToggleAllSelect?: (selected: boolean) => void;
}

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  columns,
  onSort,
  sortBy,
  sortOrder,
  isSelectable,
  isAllSelected,
  isSomeSelected,
  onToggleAllSelect,
}) => {
  const getSortIcon = (columnId: string) => {
    if (sortBy !== columnId) return '⇅';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <thead className="bg-gray-100 border-b-2">
      <tr>
        {isSelectable && (
          <th className="px-4 py-3 w-12">
            <input
              type="checkbox"
              checked={isAllSelected || false}
              indeterminate={isSomeSelected && !isAllSelected}
              onChange={(e) => onToggleAllSelect?.(e.target.checked)}
              className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={column.id}
            className="px-4 py-3 text-left font-semibold text-gray-700"
            style={column.width ? { width: column.width } : undefined}
          >
            <div className="flex items-center gap-2">
              <span>{column.header}</span>
              {column.sortable && (
                <button
                  onClick={() => onSort?.(column.id)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {getSortIcon(column.id)}
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default DataTableHeader;
