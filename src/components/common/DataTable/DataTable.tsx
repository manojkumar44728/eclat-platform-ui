import React, { useMemo, useState } from 'react';

import DataTableAdvancedFilters from './DataTableAdvancedFilters';
import DataTableBody from './DataTableBody';
import DataTableColumnManager from './DataTableColumnManager';
import DataTableEmpty from './DataTableEmpty';
import DataTableError from './DataTableError';
import DataTableHeader from './DataTableHeader';
import DataTableLoading from './DataTableLoading';
import DataTablePagination from './DataTablePagination';
import DataTableToolbar from './DataTableToolbar';
import { useColumnState, useDataTableFilters } from './hooks';
// import type { Column } from './types';
import type { Column } from './types';

export interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  // Data
  data: T[];
  columns: Column<T>[];
  rowKey?: keyof T | ((row: T) => string | number);

  // State
  loading?: boolean;
  error?: Error | string | null;
  isSelectable?: boolean;
  selectedRows?: (string | number)[];

  // Callbacks
  onRowSelect?: (rowId: string | number, selected: boolean) => void;
  onAllRowsSelect?: (selected: boolean) => void;
  onSort?: (columnId: string, order: 'asc' | 'desc') => void;
  onRetry?: () => void;

  // Pagination
  pageSize?: number;
  currentPage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  // Toolbar options
  showSearch?: boolean;
  showAdvancedFilters?: boolean;
  showColumnManager?: boolean;
  onSearch?: (query: string) => void;
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      data,
      columns,
      rowKey,
      loading = false,
      error = null,
      isSelectable = false,
      selectedRows = [],
      onRowSelect,
      onAllRowsSelect,
      onSort,
      onRetry,
      pageSize = 10,
      currentPage = 1,
      totalCount,
      onPageChange,
      onPageSizeChange,
      showSearch = true,
      showAdvancedFilters = true,
      showColumnManager = true,
      onSearch,
    },
    ref
  ) => {
    // State management
    const { visibleColumns, columnState, toggleColumnVisibility, reorderColumns, resetColumns } =
      useColumnState(columns);

    const {
      filters,
      setSearchFilter,
      setColumnFilter,
      filteredData,
    } = useDataTableFilters({ columns });

    const [showAdvancedFiltersPanel, setShowAdvancedFiltersPanel] = useState(false);
    const [showColumnManagerOverlay, setShowColumnManagerOverlay] = useState(false);

    // Get filtered data
    const displayData = useMemo(() => {
      return filteredData(data);
    }, [data, filteredData]);

    // Calculate pagination
    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * pageSize;
      return displayData.slice(start, start + pageSize);
    }, [displayData, currentPage, pageSize]);

    // Check if all rows are selected
    const visibleRowIds = paginatedData.map((row, idx) => {
      if (typeof rowKey === 'function') return rowKey(row);
      if (rowKey) return (row as Record<string, unknown>)[rowKey] as string | number;
      return idx;
    });

    const isAllSelected = visibleRowIds.length > 0 && visibleRowIds.every((id) => selectedRows.includes(id));
    const isSomeSelected = selectedRows.length > 0 && !isAllSelected;

    // Handlers
    const handleSearch = (query: string) => {
      setSearchFilter(query);
      onSearch?.(query);
      onPageChange?.(1);
    };

    const handleColumnFilter = (columnId: string, values: (string | number | boolean)[]) => {
      setColumnFilter(columnId, values);
      onPageChange?.(1);
    };

    const handleToggleAllSelect = (selected: boolean) => {
      if (selected) {
        visibleRowIds.forEach((id) => {
          if (!selectedRows.includes(id)) {
            onRowSelect?.(id, true);
          }
        });
      } else {
        visibleRowIds.forEach((id) => {
          if (selectedRows.includes(id)) {
            onRowSelect?.(id, false);
          }
        });
      }
      onAllRowsSelect?.(selected);
    };

    const columnNames = new Map(columns.map((col) => [col.id, col.header]));

    // Render states
    if (loading) {
      return (
        <div ref={ref} className="bg-white rounded-lg border border-gray-200 p-6">
          <DataTableLoading />
        </div>
      );
    }

    if (error) {
      return (
        <div ref={ref} className="bg-white rounded-lg border border-gray-200 p-6">
          <DataTableError error={error} onRetry={onRetry} />
        </div>
      );
    }

    return (
      <div ref={ref} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        {(showSearch || showAdvancedFilters || showColumnManager) && (
          <div className="p-4 border-b border-gray-200">
            <DataTableToolbar
              onSearchChange={handleSearch}
              onAdvancedFiltersToggle={setShowAdvancedFiltersPanel}
              onColumnManagerToggle={setShowColumnManagerOverlay}
              showAdvancedFilters={showAdvancedFilters}
              showColumnManager={showColumnManager}
            />
          </div>
        )}

        {/* Advanced Filters */}
        {showAdvancedFiltersPanel && (
          <div className="px-4 pt-4">
            <DataTableAdvancedFilters
              columns={columns}
              data={data}
              activeFilters={filters.filters}
              onFilterChange={handleColumnFilter}
              onClose={() => setShowAdvancedFiltersPanel(false)}
            />
          </div>
        )}

        {/* Column Manager Overlay */}
        {showColumnManagerOverlay && (
          <DataTableColumnManager
            columns={columnState}
            columnNames={columnNames}
            onToggleVisibility={toggleColumnVisibility}
            onReorder={reorderColumns}
            onReset={resetColumns}
            onClose={() => setShowColumnManagerOverlay(false)}
          />
        )}

        {/* Table */}
        {displayData.length === 0 ? (
          <div className="p-6">
            <DataTableEmpty message="No data found" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <DataTableHeader
                  columns={visibleColumns()}
                  onSort={onSort ? (colId) => onSort(colId, 'asc') : undefined}
                  isSelectable={isSelectable}
                  isAllSelected={isAllSelected}
                  isSomeSelected={isSomeSelected}
                  onToggleAllSelect={handleToggleAllSelect}
                />
                <DataTableBody
                  data={paginatedData}
                  columns={visibleColumns()}
                  selectedRows={selectedRows}
                  onToggleSelect={onRowSelect}
                  isSelectable={isSelectable}
                  rowKey={rowKey}
                />
              </table>
            </div>

            {/* Pagination */}
            {totalCount !== undefined && onPageChange && (
              <DataTablePagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange || (() => {})}
              />
            )}
          </>
        )}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';

export default DataTable;