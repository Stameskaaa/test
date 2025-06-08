import { Table } from '@tanstack/react-table';
import { useDroppable } from '@dnd-kit/core';
import { RowData } from './types';
import { TableRow } from './TableRow';
import {
  TableBody as TableBodyComponent,
  TableCell,
  TableRow as TableRowComponent,
} from '@/components/ui/table';

interface TableBodyProps {
  table: Table<RowData>;
}

export const TableBody: React.FC<TableBodyProps> = ({ table }) => {
  const { setNodeRef } = useDroppable({
    id: 'clientsTable',
  });

  return (
    <>
      <TableBodyComponent ref={setNodeRef}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => <TableRow row={row} key={row.id} />)
        ) : (
          <TableRowComponent>
            <TableCell className="h-24">-</TableCell>
          </TableRowComponent>
        )}
      </TableBodyComponent>
    </>
  );
};
