import React, { useMemo } from 'react';
import type { Column, FilterValue } from './types';
import { getColumnUniqueValues } from './utils';

interface DataTableAdvancedFiltersProps<T = any> {
  columns: Column<T>[];
  data: T[];
  activeFilters?: FilterValue[];
  onFilterChange: (columnId: string, values: (string | number | boolean)[]) => void;
  onClose?: () => void;
}

export const DataTableAdvancedFilters: React.FC<DataTableAdvancedFiltersProps> = ({
  columns,
  data,
  activeFilters = [],
  onFilterChange,
  onClose,
}) => {
  // Get unique values for each column
  const columnValues = useMemo(() => {
    const map = new Map<string, (string | number | boolean)[]>();
    columns.forEach((col) => {
      if (col.filterable !== false) {
        map.set(col.id, getColumnUniqueValues(data, col));
      }
    });
    return map;
  }, [columns, data]);

  // Get active filter values for each column
  const getActiveFilterValues = (columnId: string): (string | number | boolean)[] => {
    return activeFilters.find((f) => f.columnId === columnId)?.values || [];
  };

  // Handle checkbox change
  const handleCheckboxChange = (
    columnId: string,
    value: string | number | boolean,
    checked: boolean
  ) => {
    const currentValues = getActiveFilterValues(columnId);
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    onFilterChange(columnId, newValues);
  };

  const filterableColumns = columns.filter((col) => col.filterable !== false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Advanced Filters</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filterableColumns.map((column) => {
          const values = columnValues.get(column.id) || [];
          if (values.length === 0) return null;

          const activeValues = getActiveFilterValues(column.id);

          return (
            <div key={column.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h4 className="font-medium text-gray-700 mb-3">{column.header}</h4>
                  <div className="border rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                    <div className="space-y-2">
                      {values.map((value, idx) => (
                        <label key={`${column.id}-${idx}`} className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-white">
                          <input
                            type="checkbox"
                            checked={activeValues.includes(value)}
                            onChange={(e) =>
                              handleCheckboxChange(column.id, value, e.target.checked)
                            }
                            className="w-4 h-4 accent-blue-600"
                          />
                          <span className="text-sm text-gray-700">
                            {String(value)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
            </div>
          );
        })}
      </div>

      {filterableColumns.length === 0 && (
        <p className="text-center text-gray-500 text-sm">
          No filterable columns available
        </p>
      )}
    </div>
  );
};

export default DataTableAdvancedFilters;
