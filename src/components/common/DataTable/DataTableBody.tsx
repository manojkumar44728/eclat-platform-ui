import React from 'react';
import type { Column } from './types';
import DataTableRow from './DataTableRow';

interface DataTableBodyProps<T = any> {
  data: T[];
  columns: Column<T>[];
  selectedRows?: (string | number)[];
  onToggleSelect?: (rowId: string | number, selected: boolean) => void;
  isSelectable?: boolean;
  rowKey?: keyof T | ((row: T) => string | number);
}

export const DataTableBody: React.FC<DataTableBodyProps> = ({
  data,
  columns,
  selectedRows,
  onToggleSelect,
  isSelectable,
  rowKey,
}) => {
  const getRowId = (row: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(row);
    } else if (rowKey) {
      return (row as any)[rowKey] ?? index;
    }
    return index;
  };

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (isSelectable ? 1 : 0)}
            className="px-4 py-8 text-center text-gray-500"
          >
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, index) => {
        const rowId = getRowId(row, index);
        const isSelected = selectedRows?.includes(rowId);

        return (
          <DataTableRow
            key={rowId}
            row={row}
            columns={columns}
            isSelected={isSelected}
            onToggleSelect={(selected) => onToggleSelect?.(rowId, selected)}
            isSelectable={isSelectable}
          />
        );
      })}
    </tbody>
  );
};

export default DataTableBody;
