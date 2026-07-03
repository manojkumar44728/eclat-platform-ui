import React, { useState, useMemo } from 'react';
import { DataTable, Column, ButtonAction } from '@/components/common/DataTable';

/**
 * Example: Complete DataTable Implementation
 * Shows all features: filtering, column management, row selection, pagination
 */

interface Product {
  id: number;
  name: string;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  progress: number;
  inStock: boolean;
  price: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    status: 'active',
    progress: 95,
    inStock: true,
    price: 999,
  },
  {
    id: 2,
    name: 'Monitor',
    category: 'Electronics',
    status: 'pending',
    progress: 60,
    inStock: false,
    price: 299,
  },
  {
    id: 3,
    name: 'Keyboard',
    category: 'Accessories',
    status: 'active',
    progress: 100,
    inStock: true,
    price: 79,
  },
  {
    id: 4,
    name: 'Mouse',
    category: 'Accessories',
    status: 'inactive',
    progress: 30,
    inStock: true,
    price: 29,
  },
  {
    id: 5,
    name: 'USB-C Hub',
    category: 'Accessories',
    status: 'active',
    progress: 75,
    inStock: false,
    price: 49,
  },
];

export function DataTableExample() {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // Define columns with all available features
  const columns: Column<Product>[] = useMemo(
    () => [
      {
        id: 'indicator',
        header: '',
        accessor: (row: Product) => {
          // Map status to a color dot
          if (row.status === 'active') return 'bg-green-500';
          if (row.status === 'pending') return 'bg-yellow-500';
          if (row.status === 'inactive') return 'bg-red-500';
          return 'bg-gray-400';
        },
        type: 'indicator',
        width: '40px',
        order: -1,
      },
      {
        id: 'name',
        header: 'Product Name',
        accessor: 'name',
        type: 'text',
        sortable: true,
        filterable: true,
        width: '200px',
        order: 0,
      },
      {
        id: 'category',
        header: 'Category',
        accessor: 'category',
        type: 'text',
        sortable: true,
        filterable: true,
        width: '150px',
        order: 1,
      },
      {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        type: 'status',
        filterable: true,
        width: '120px',
        order: 2,
      },
      {
        id: 'progress',
        header: 'Progress',
        accessor: 'progress',
        type: 'progress',
        width: '150px',
        order: 3,
      },
      {
        id: 'inStock',
        header: 'In Stock',
        accessor: 'inStock',
        type: 'checkbox',
        width: '100px',
        order: 4,
      },
      {
        id: 'sku',
        header: 'SKU',
        accessor: (r: Product) => `SKU-${r.id}`,
        type: 'text',
        width: '120px',
        order: 5,
      },
      {
        id: 'price',
        header: 'Price',
        accessor: 'price',
        type: 'text',
        render: (value) => `$${value}`,
        sortable: true,
        width: '100px',
        order: 5,
      },
      {
        id: 'actions',
        header: 'Actions',
        type: 'buttons',
        actions: [
          {
            label: 'Edit',
            onClick: (row: Product) => {
              console.log('Edit product:', row);
              // Handle edit
            },
            variant: 'primary',
            size: 'sm',
          },
          {
            label: 'Delete',
            onClick: (row: Product) => {
              console.log('Delete product:', row);
              // Handle delete
            },
            variant: 'danger',
            size: 'sm',
          },
        ],
        width: '150px',
        order: 6,
      },
    ],
    []
  );

  // Handle row selection
  const handleRowSelect = (rowId: string | number, selected: boolean) => {
    setSelectedRows((prev) =>
      selected ? [...prev, rowId] : prev.filter((id) => id !== rowId)
    );
  };

  // Handle all rows selection
  const handleAllRowsSelect = (selected: boolean) => {
    if (selected) {
      setSelectedRows(mockProducts.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // You can implement search API call here
  };

  // Handle sort
  const handleSort = (columnId: string, order: 'asc' | 'desc') => {
    console.log('Sort:', columnId, order);
    // You can implement sorting API call here
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <div className="text-sm text-gray-600">
          Selected: {selectedRows.length} / {mockProducts.length}
        </div>
      </div>

      <DataTable
        data={mockProducts}
        columns={columns}
        rowKey="id"
        loading={loading}
        isSelectable
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onAllRowsSelect={handleAllRowsSelect}
        onSort={handleSort}
        onSearch={handleSearch}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        totalCount={mockProducts.length}
        showSearch
        showAdvancedFilters
        showColumnManager
      />

      {selectedRows.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            {selectedRows.length} rows selected. You can perform bulk actions here.
          </p>
          <button
            onClick={() => setSelectedRows([])}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTableExample;
