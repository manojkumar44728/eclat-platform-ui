// Cell renderer types
export type CellType = 'text' | 'status' | 'toggle' | 'progress' | 'buttons' | 'checkbox' | 'indicator';

export interface CellRendererProps<T = any> {
  value: any;
  row: T;
  column: Column<T>;
}

export interface StatusCellProps extends CellRendererProps {
  value: 'active' | 'inactive' | 'pending' | 'error';
}

export interface ToggleCellProps extends CellRendererProps {
  onChange?: (value: boolean) => void;
  label?: string;
}

export interface ProgressCellProps extends CellRendererProps {
  value: number; // 0-100
}

export interface ButtonAction<T = any> {
  label: string;
  onClick: (row: T) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export interface ButtonsCellProps extends CellRendererProps {
  actions: ButtonAction[];
}

export interface CheckboxCellProps extends CellRendererProps {
  onChange?: (checked: boolean) => void;
}

// Column definition
export interface Column<T = any> {
  id: string;
  header: string;
  accessor?: keyof T | ((row: T) => any);
  type?: CellType;
  width?: number | string;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  order?: number;
  
  // Cell-specific config
  statusOptions?: Record<string, { label: string; color: string }>;
  progressLabel?: string;
  actions?: ButtonAction<T>[];
  toggleLabel?: string;
  
  // Custom render function
  render?: (value: any, row: T) => React.ReactNode;
}

// Table data structure
export interface DataTableConfig<T = any> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: Error | null;
  pageSize?: number;
  currentPage?: number;
  totalCount?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  selectedRows?: (string | number)[];
  onRowSelect?: (rowId: string | number, selected: boolean) => void;
  onAllRowsSelect?: (selected: boolean) => void;
  rowKey?: keyof T | ((row: T) => string | number);
}

// Filter structure
export interface FilterValue {
  columnId: string;
  values: (string | number | boolean)[];
}

export interface TableFilters {
  search?: string;
  filters?: FilterValue[];
}

// Column visibility and order state
export interface ColumnState {
  id: string;
  visible: boolean;
  order: number;
}

// Column manager overlay state
export interface ColumnManagerState {
  columns: ColumnState[];
  isOpen: boolean;
}
