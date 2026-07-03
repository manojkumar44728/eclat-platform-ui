# DataTable Component Documentation

A highly flexible, production-ready DataTable component for React with support for multiple cell types, advanced filtering, column management, and more.

## Features

- ✅ **Flexible Cell Types**: Text, Status Indicators, Toggle Buttons, Progress Bars, Multiple Actions, Checkboxes
- ✅ **Advanced Filtering**: Search with debounce + Column-specific filters with checkboxes
- ✅ **Column Manager**: Drag-and-drop reordering + Show/Hide columns
- ✅ **Row Selection**: Select individual rows or all rows at once
- ✅ **Pagination**: Built-in pagination with configurable page sizes
- ✅ **Sortable Columns**: Optional column sorting
- ✅ **Custom Renderers**: Use custom render functions for any cell
- ✅ **Loading/Error States**: Built-in loading, empty, and error states
- ✅ **TypeScript Support**: Fully typed for better developer experience

## Installation

The DataTable is located in `src/components/common/DataTable/` and exports everything you need.

## Quick Start

### Basic Usage

```tsx
import { DataTable, Column } from '@/components/common/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
];

const columns: Column<User>[] = [
  { id: 'name', header: 'Name', type: 'text' },
  { id: 'email', header: 'Email', type: 'text' },
  { id: 'status', header: 'Status', type: 'status' },
];

export function UserTable() {
  return (
    <DataTable
      data={users}
      columns={columns}
      rowKey="id"
      isSelectable
      pageSize={10}
    />
  );
}
```

## Column Types

### 1. Text Cell (Default)

Renders plain text values.

```tsx
{
  id: 'name',
  header: 'Name',
  type: 'text',
  // Optional: accessor to get nested values
  accessor: (row) => row.user.name
}
```

### 2. Status Cell

Displays status with colored badges.

```tsx
{
  id: 'status',
  header: 'Status',
  type: 'status',
  // Supported values: 'active' | 'inactive' | 'pending' | 'error'
}
```

### 3. Toggle Cell

Interactive toggle button with optional label.

```tsx
{
  id: 'isEnabled',
  header: 'Enabled',
  type: 'toggle',
  toggleLabel: 'Turn on/off',
}
```

### 4. Progress Cell

Shows a progress bar with percentage.

```tsx
{
  id: 'completion',
  header: 'Progress',
  type: 'progress',
  // Value should be 0-100
}
```

### 5. Checkbox Cell

Interactive checkbox for row selection or data toggling.

```tsx
{
  id: 'subscribe',
  header: 'Subscribe',
  type: 'checkbox',
}
```

### 6. Buttons Cell

Multiple action buttons in a single cell.

```tsx
{
  id: 'actions',
  header: 'Actions',
  type: 'buttons',
  actions: [
    {
      label: 'Edit',
      onClick: (row) => console.log('Edit', row),
      variant: 'primary',
      size: 'sm'
    },
    {
      label: 'Delete',
      onClick: (row) => console.log('Delete', row),
      variant: 'danger',
      size: 'sm'
    }
  ]
}
```

## Advanced Features

### Custom Cell Rendering

Use the `render` function for complete control over cell rendering:

```tsx
{
  id: 'custom',
  header: 'Custom Field',
  render: (value, row) => (
    <div className="custom-cell">
      {/* Your custom JSX here */}
    </div>
  )
}
```

### Column Configuration

```tsx
interface Column<T> {
  id: string;                    // Unique column ID
  header: string;                // Display header
  accessor?: keyof T | ((row: T) => any);  // How to extract value
  type?: CellType;              // Cell type
  width?: number | string;      // Column width
  sortable?: boolean;           // Enable sorting
  filterable?: boolean;         // Include in filters (default: true)
  visible?: boolean;            // Initially visible (default: true)
  order?: number;               // Initial order
  render?: (value: any, row: T) => React.ReactNode;  // Custom renderer
}
```

### Using with State Management

```tsx
import { useState } from 'react';
import { DataTable, Column } from '@/components/common/DataTable';

export function AdvancedTable() {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRowSelect = (rowId: string | number, selected: boolean) => {
    setSelectedRows(prev =>
      selected
        ? [...prev, rowId]
        : prev.filter(id => id !== rowId)
    );
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={loading}
      isSelectable
      selectedRows={selectedRows}
      onRowSelect={handleRowSelect}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      pageSize={10}
      totalCount={data.length}
    />
  );
}
```

### Filtering with API

```tsx
export function FilteredTable() {
  const [data, setData] = useState<User[]>([]);
  const [filters, setFilters] = useState({});

  const handleSearch = (query: string) => {
    // Send search to API
    fetchUsers({ search: query }).then(setData);
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      onSearch={handleSearch}
      showAdvancedFilters
      showColumnManager
    />
  );
}
```

## Hooks

### useColumnState

Manage column visibility and ordering.

```tsx
import { useColumnState } from '@/components/common/DataTable';

const {
  columnState,           // Current column state
  visibleColumns,        // Get visible columns in order
  toggleColumnVisibility,
  reorderColumns,
  resetColumns,
} = useColumnState(columns);
```

### useDataTableFilters

Handle search and column filtering.

```tsx
import { useDataTableFilters } from '@/components/common/DataTable';

const {
  filters,               // Current active filters
  setSearchFilter,
  setColumnFilter,
  removeColumnFilter,
  clearAllFilters,
  getColumnFilterValues, // Get available values for a column
  filteredData,         // Apply filters to data
} = useDataTableFilters({ columns });
```

## API Reference

### DataTable Props

```tsx
interface DataTableProps<T> {
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
```

## Architecture

```
DataTable/
├── DataTable.tsx              # Main component
├── types.ts                   # TypeScript definitions
├── hooks/
│   ├── useColumnState.ts      # Column visibility/ordering
│   ├── useDataTableFilters.ts # Search/filter logic
│   └── index.ts
├── cellRenderers/
│   ├── TextCell.tsx
│   ├── StatusCell.tsx
│   ├── ToggleCell.tsx
│   ├── ProgressCell.tsx
│   ├── ButtonsCell.tsx
│   ├── CheckboxCell.tsx
│   └── index.ts
├── DataTableHeader.tsx        # Table header
├── DataTableBody.tsx          # Table body
├── DataTableRow.tsx           # Single row
├── DataTableCell.tsx          # Cell with renderer
├── DataTableToolbar.tsx       # Search + buttons
├── DataTableSearch.tsx        # Search input
├── DataTableAdvancedFilters.tsx # Advanced filter panel
├── DataTableColumnManager.tsx # Column manager overlay
├── DataTablePagination.tsx    # Pagination controls
├── DataTableLoading.tsx       # Loading state
├── DataTableEmpty.tsx         # Empty state
├── DataTableError.tsx         # Error state
├── utils/
│   ├── cellUtils.ts           # Utility functions
│   └── index.ts
└── index.ts                   # Main export
```

## Styling

The component uses Tailwind CSS classes. Make sure your project has Tailwind CSS configured.

### Custom Styling

You can override styles by:

1. **Using Tailwind overrides**: Add custom Tailwind classes
2. **Creating wrapper components**: Wrap and customize individual components
3. **CSS modules**: Add custom CSS module alongside components

## Best Practices

1. **Memoize columns**: If columns don't change, memoize them to prevent unnecessary re-renders
2. **Use rowKey**: Always provide a unique `rowKey` for better performance
3. **Handle errors**: Always provide error handling and retry functionality
4. **Pagination**: Use pagination for large datasets
5. **Custom renderers**: Use custom render functions for complex cell logic
6. **TypeScript**: Define proper types for your data

## Examples

See the `examples/` directory for complete working examples:
- Basic table with text and status columns
- Table with filtering and search
- Table with row selection
- Table with custom cell renderers
- Table with pagination and API integration

## Performance Tips

- Use `useMemo` for column definitions if they're complex
- Implement virtual scrolling for very large datasets (10k+ rows)
- Use `selectedRows` state in parent component for row selection
- Paginate large datasets to reduce DOM nodes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
