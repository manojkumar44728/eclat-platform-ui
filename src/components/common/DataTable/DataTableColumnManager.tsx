import React, { useState } from 'react';
import type { ColumnState } from './types';

interface DataTableColumnManagerProps {
  columns: ColumnState[];
  columnNames: Map<string, string>;
  onToggleVisibility: (columnId: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onReset?: () => void;
  onClose?: () => void;
}

export const DataTableColumnManager: React.FC<DataTableColumnManagerProps> = ({
  columns,
  columnNames,
  onToggleVisibility,
  onReorder,
  onReset,
  onClose,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Sort columns by order for display
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== toIndex) {
      onReorder(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-gray-800">Manage Columns</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ✕
            </button>
          )}
        </div>

        {/* Column List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sortedColumns.map((column, index) => (
            <div
              key={column.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-colors
                ${draggedIndex === index ? 'opacity-50' : ''}
                ${dragOverIndex === index ? 'bg-blue-50 border-2 border-blue-300' : 'border-2 border-transparent'}
                hover:bg-gray-50 cursor-move
              `}
            >
              {/* Drag Handle */}
              <div className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>

              {/* Visibility Checkbox */}
              <input
                type="checkbox"
                checked={column.visible}
                onChange={() => onToggleVisibility(column.id)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />

              {/* Column Name */}
              <span className="flex-1 text-gray-800 font-medium">
                {columnNames.get(column.id) || column.id}
              </span>

              {/* Order Badge */}
              <span className="flex-shrink-0 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t bg-gray-50">
          {onReset && (
            <button
              onClick={onReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTableColumnManager;