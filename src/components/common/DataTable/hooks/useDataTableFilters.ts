import { useState, useCallback, useMemo } from 'react';
import type { TableFilters, FilterValue, Column } from '../types';

interface UseDataTableFiltersProps<T> {
  columns: Column<T>[];
}

export const useDataTableFilters = <T,>({ columns }: UseDataTableFiltersProps<T>) => {
  const [filters, setFilters] = useState<TableFilters>({});

  // Get available filter values for a column
  const getColumnFilterValues = useCallback(
    (columnId: string, data: T[]): (string | number | boolean)[] => {
      const column = columns.find((col) => col.id === columnId);
      if (!column) return [];

      const values = new Set<string | number | boolean>();

      data.forEach((row) => {
        let value: any;

        if (typeof column.accessor === 'function') {
          value = column.accessor(row);
        } else if (column.accessor) {
          value = (row as any)[column.accessor];
        } else {
          value = (row as any)[columnId];
        }

        if (value !== null && value !== undefined) {
          values.add(value);
        }
      });

      return Array.from(values).sort((a, b) => {
        if (typeof a === 'string' && typeof b === 'string') {
          return a.localeCompare(b);
        }
        return String(a).localeCompare(String(b));
      });
    },
    [columns]
  );

  // Update search filter
  const setSearchFilter = useCallback((search: string) => {
    setFilters((prev) => ({
      ...prev,
      search: search.trim() || undefined,
    }));
  }, []);

  // Update column filter
  const setColumnFilter = useCallback((columnId: string, values: (string | number | boolean)[]) => {
    setFilters((prev) => {
      const filters = prev.filters || [];
      const filterIndex = filters.findIndex((f) => f.columnId === columnId);

      if (values.length === 0) {
        // Remove filter if no values selected
        return {
          ...prev,
          filters: filters.filter((f) => f.columnId !== columnId),
        };
      }

      if (filterIndex >= 0) {
        filters[filterIndex] = { columnId, values };
      } else {
        filters.push({ columnId, values });
      }

      return {
        ...prev,
        filters,
      };
    });
  }, []);

  // Remove column filter
  const removeColumnFilter = useCallback((columnId: string) => {
    setFilters((prev) => ({
      ...prev,
      filters: (prev.filters || []).filter((f) => f.columnId !== columnId),
    }));
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Filter data based on current filters
  const filteredData = useCallback(
    (data: T[]): T[] => {
      let result = data;

      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter((row) => {
          return columns.some((col) => {
            let value: any;

            if (typeof col.accessor === 'function') {
              value = col.accessor(row);
            } else if (col.accessor) {
              value = (row as any)[col.accessor];
            } else {
              value = (row as any)[col.id];
            }

            return value && String(value).toLowerCase().includes(searchLower);
          });
        });
      }

      // Apply column filters
      if (filters.filters && filters.filters.length > 0) {
        result = result.filter((row) => {
          return filters.filters!.every((filter) => {
            const column = columns.find((col) => col.id === filter.columnId);
            if (!column) return true;

            let value: any;

            if (typeof column.accessor === 'function') {
              value = column.accessor(row);
            } else if (column.accessor) {
              value = (row as any)[column.accessor];
            } else {
              value = (row as any)[filter.columnId];
            }

            return filter.values.includes(value);
          });
        });
      }

      return result;
    },
    [filters, columns]
  );

  return {
    filters,
    setSearchFilter,
    setColumnFilter,
    removeColumnFilter,
    clearAllFilters,
    getColumnFilterValues,
    filteredData,
  };
};
