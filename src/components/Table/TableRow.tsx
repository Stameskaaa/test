import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { flexRender, Row } from '@tanstack/react-table';
import { CSS } from '@dnd-kit/utilities';
import { RowData } from './types';
import { TableCell, TableRow as TableRowComponent } from '@/components/ui/table';
import { IconBurger } from '@/icons/icons';
import { Text } from '../Typography/Text';

export const TableRow = ({ row }: { row: Row<RowData> }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: row.original.names,
  });

  const style = {
    zIndex: 1000000,
    transform: CSS.Translate.toString(transform),
    transition: transform ? 'transform 200ms ease' : undefined,
  };

  return (
    <TableRowComponent ref={setNodeRef} style={style} className="text-left">
      <div
        className="py-5 pl-4 pr-3 cursor-grab grid place-items-center"
        {...listeners}
        {...attributes}>
        <IconBurger />
      </div>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className="min-w-0 bg-white truncate  pl-0 pr-3 py-3 cursor-pointer">
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
