import React, { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { flexRender, Row } from '@tanstack/react-table';
import { CSS } from '@dnd-kit/utilities';
import { RowData } from './types';
import { TableCell, TableRow as TableRowComponent } from '@/components/ui/table';
import { IconBurger } from '@/icons/icons';
import { Text } from '../Typography/Text';

export const TableRow = ({ row }: { row: Row<RowData> }) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: row.original.names,
    data: {
      rowData: row,
      width: rowRef.current?.offsetWidth,
    },
  });

  const setCombinedRef = (node: HTMLTableRowElement | null) => {
    setNodeRef(node);
    rowRef.current = node;
  };

  const sortStyle = {
    transform: CSS.Translate.toString(transform),
    transition: 'transform 200ms ease',
  };

  return (
    <TableRowComponent ref={setCombinedRef} style={{ ...sortStyle }} className="bg-white">
      <td
        className="py-5 pl-4 pr-3 cursor-grab grid place-items-center"
        {...listeners}
        {...attributes}>
        <IconBurger />
      </td>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="min-w-0 pl-0 pr-3 py-3 cursor-pointer">
          <Text
            color={row.original.disabled ? 'gray' : undefined}
            alignment="left"
            size="xs"
            className="truncate">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Text>
        </TableCell>
      ))}
    </TableRowComponent>
  );
};
