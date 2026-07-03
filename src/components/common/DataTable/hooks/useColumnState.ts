import { useState, useCallback } from 'react';
import type { ColumnState } from '../types';
import type { Column } from '../types';

export const useColumnState = <T,>(columns: Column<T>[]) => {
  // Initialize column state from columns array
  const [columnState, setColumnState] = useState<ColumnState[]>(() => {
    return columns
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((col, index) => ({
        id: col.id,
        visible: col.visible !== false,
        order: col.order ?? index,
      }));
  });

  // Get visible columns in correct order
  const visibleColumns = useCallback((): Column<T>[] => {
    const stateMap = new Map(columnState.map((cs) => [cs.id, cs]));
    return columns
      .filter((col) => stateMap.get(col.id)?.visible)
      .sort((a, b) => (stateMap.get(a.id)?.order || 0) - (stateMap.get(b.id)?.order || 0));
  }, [columns, columnState]);

  // Toggle column visibility
  const toggleColumnVisibility = useCallback((columnId: string) => {
    setColumnState((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  }, []);

  // Reorder columns
  const reorderColumns = useCallback((fromIndex: number, toIndex: number) => {
    setColumnState((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const [moved] = sorted.splice(fromIndex, 1);
      sorted.splice(toIndex, 0, moved);

      return sorted.map((col, idx) => ({
        ...col,
        order: idx,
      }));
    });
  }, []);

  // Reset to default
  const resetColumns = useCallback(() => {
    setColumnState(
      columns
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((col, index) => ({
          id: col.id,
          visible: col.visible !== false,
          order: col.order ?? index,
        }))
    );
  }, [columns]);

  return {
    columnState,
    visibleColumns,
    toggleColumnVisibility,
    reorderColumns,
    resetColumns,
  };
};
