import React, { useState } from 'react';
import DataTableSearch from './DataTableSearch';

interface DataTableToolbarProps {
  onSearchChange: (query: string) => void;
  onAdvancedFiltersToggle?: (isOpen: boolean) => void;
  onColumnManagerToggle?: (isOpen: boolean) => void;
  showAdvancedFilters?: boolean;
  showColumnManager?: boolean;
}

export const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
  onSearchChange,
  onAdvancedFiltersToggle,
  onColumnManagerToggle,
  showAdvancedFilters = true,
  showColumnManager = true,
}) => {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-1">
        <DataTableSearch onSearchChange={onSearchChange} />
      </div>

      {showAdvancedFilters && (
        <button
          onClick={() => onAdvancedFiltersToggle?.(true)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Advanced Search
        </button>
      )}

      {showColumnManager && (
        <button
          onClick={() => onColumnManagerToggle?.(true)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-6 0V3m0 2H9m6 0h-2m6 8h-6m-6 0h6"
            />
          </svg>
          Column Manager
        </button>
      )}
    </div>
  );
};

export default DataTableToolbar;