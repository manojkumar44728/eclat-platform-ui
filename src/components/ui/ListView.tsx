import type { Column } from '@/components/common/DataTable';
import { DataTable } from '@/components/common/DataTable';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  status: 'active' | 'inactive';
}

const columns: Column<User>[] = [
  { id: 'name', header: 'Name', accessor: 'name', type: 'text' },
  { id: 'status', header: 'Status', accessor: 'status', type: 'status' },
];

const dummyUsers: User[] = [
  { id: 1, name: 'John Doe', status: 'active' },
  { id: 2, name: 'Jane Smith', status: 'inactive' },
  { id: 3, name: 'Michael Johnson', status: 'active' },
  { id: 4, name: 'Emily Davis', status: 'inactive' },
  { id: 5, name: 'William Brown', status: 'active' },
  { id: 6, name: 'Sophia Wilson', status: 'active' },
  { id: 7, name: 'James Taylor', status: 'inactive' },
  { id: 8, name: 'Olivia Anderson', status: 'active' },
  { id: 9, name: 'Benjamin Thomas', status: 'inactive' },
  { id: 10, name: 'Charlotte Moore', status: 'active' },
  { id: 11, name: 'Daniel Martin', status: 'active' },
  { id: 12, name: 'Ava Jackson', status: 'inactive' },
];

export function ListView() {
  const [data, setData] =  useState<User[]>([]);

  return (
    <DataTable
      data={dummyUsers}
      columns={columns}
      isSelectable
      showAdvancedFilters
      showColumnManager
      pageSize={10}
    />
  );
}