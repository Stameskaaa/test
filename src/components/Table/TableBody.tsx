import { useRef, useState } from 'react';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { DndContext, closestCenter, DragEndEvent, useDroppable, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { RowData } from './types';
import { TableRow } from './TableRow';
import {
  TableBody as TableBodyComponent,
  TableCell,
  TableRow as TableRowComponent,
} from '@/components/ui/table';
import { Text } from '../Typography/Text';
import { IconBurger } from '@/icons/icons';

interface TableBodyProps {
  table: Table<RowData>;
  rowData: RowData[];
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>;
}

export const TableBody: React.FC<TableBodyProps> = ({ table, setRowData, rowData }) => {
  const { setNodeRef } = useDroppable({
    id: 'clientsTable',
  });
  const rowRef = useRef(null);

  const [activeRow, setActiveRow] = useState<{ row: Row<RowData>; width: number | null } | null>(
    null,
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = rowData.findIndex((item) => item.names === active.id);
      const newIndex = rowData.findIndex((item) => item.names === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setRowData(arrayMove(rowData, oldIndex, newIndex));
      }
    }
    setActiveRow(null);
  };

  const handleDragStart = (event: DragEndEvent) => {
    const row = event.active.data.current?.rowData;
    const width = event.active.data.current?.width;
    if (row) setActiveRow({ row, width });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}>
      <SortableContext
        items={rowData.map((row) => row.names)}
        strategy={verticalListSortingStrategy}>
        <TableBodyComponent ref={setNodeRef}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => <TableRow row={row} key={row.id} />)
          ) : (
            <TableRowComponent ref={rowRef}>
              <TableCell className="h-24">-</TableCell>
            </TableRowComponent>
          )}
        </TableBodyComponent>
        <DragOverlay>
          {activeRow && (
            <tr className="bg-white border-1">
              <div className="py-5 pl-4 pr-3 cursor-grab grid place-items-center">
                <IconBurger />
              </div>
              {activeRow.row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`min-w-0 pl-0 pr-3 py-3 cursor-pointer`}
                  style={{ width: activeRow.width || 'auto' }}>
                  <Text
                    color={activeRow.row.original.disabled ? 'gray' : undefined}
                    alignment="left"
                    size="xs"
                    className="truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Text>
                </TableCell>
              ))}
            </tr>
          )}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
