import type { Column } from '../types';

/**
 * Get the value from a row using a column accessor
 */
export const getCellValue = <T,>(row: T, column: Column<T>): any => {
  if (typeof column.accessor === 'function') {
    return column.accessor(row);
  } else if (column.accessor) {
    return (row as any)[column.accessor];
  } else {
    return (row as any)[column.id];
  }
};

/**
 * Get unique values from data for a specific column (for filtering)
 */
export const getColumnUniqueValues = <T,>(
  data: T[],
  column: Column<T>
): (string | number | boolean)[] => {
  const values = new Set<string | number | boolean>();

  data.forEach((row) => {
    const value = getCellValue(row, column);
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
};

/**
 * Check if row matches search query
 */
export const rowMatchesSearch = <T,>(
  row: T,
  columns: Column<T>[],
  searchQuery: string
): boolean => {
  if (!searchQuery.trim()) return true;

  const lowerQuery = searchQuery.toLowerCase();

  return columns.some((col) => {
    const value = getCellValue(row, col);
    return value && String(value).toLowerCase().includes(lowerQuery);
  });
};

/**
 * Check if row matches all active filters
 */
export const rowMatchesFilters = <T,>(
  row: T,
  column: Column<T>,
  filterValues: (string | number | boolean)[]
): boolean => {
  if (filterValues.length === 0) return true;

  const cellValue = getCellValue(row, column);
  return filterValues.includes(cellValue);
};
