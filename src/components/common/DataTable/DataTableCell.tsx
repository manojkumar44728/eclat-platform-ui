import React from 'react';
import type { CellRendererProps, Column } from './types';
import {
  TextCell,
  StatusCell,
  ToggleCell,
  ProgressCell,
  ButtonsCell,
  CheckboxCell,
} from './cellRenderers';
import { getCellValue } from './utils';

interface DataTableCellProps<T = any> extends Omit<CellRendererProps<T>, 'value' | 'column'> {
  column: Column<T>;
  row: T;
  isSelected?: boolean;
  onToggleSelect?: (selected: boolean) => void;
}

export const DataTableCell: React.FC<DataTableCellProps> = ({
  column,
  row,
  isSelected,
  onToggleSelect,
}) => {
  const value = getCellValue(row, column);

  // Use custom renderer if provided
  if (column.render) {
    return <>{column.render(value, row)}</>;
  }

  const cellType = column.type || 'text';

  const commonProps = { value, row, column };

  switch (cellType) {
    case 'indicator':
      return <IndicatorCell {...commonProps} />;
    case 'status':
      return <StatusCell {...commonProps} />;

    case 'toggle':
      return (
        <ToggleCell
          {...commonProps}
          label={column.toggleLabel}
          onChange={(newValue) => {
            // You can add callback logic here
          }}
        />
      );

    case 'progress':
      return <ProgressCell {...commonProps} />;

    case 'buttons':
      return (
        <ButtonsCell
          {...commonProps}
          actions={column.actions || []}
        />
      );

    case 'checkbox':
      return (
        <CheckboxCell
          {...commonProps}
          onChange={(checked) => {
            onToggleSelect?.(checked);
          }}
        />
      );

    case 'text':
    default:
      return <TextCell {...commonProps} />;
  }
};

export default DataTableCell;
