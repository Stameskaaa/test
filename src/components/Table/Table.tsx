import { IconBurger, SettingIcon } from '@/icons/icons';
import { useEffect, useMemo, useState } from 'react';
import { closestCenter, DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import { ClientFilters } from '@/pages/[[...slug]]';
import { ActiveRow, RowData, SortedType, TableHeaderForm } from './types';
import { getColumns } from '@/mock/data';
import { filterClients, filterTableHeader, generateClientTableData } from '@/helpers/helpers';
import { Table, TableCell } from '@/components/ui/table';
import { Heading } from '../Typography/Heading';
import { FilterSelect } from '../Filters/FilterUI/FilterSelect';
import { Form } from '../ui/form';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';

import { Text } from '../Typography/Text';

export const initialFilters: ClientFilters = {
  categoryClient: [],
  male: [],
  name: '',
  masters: [],
  services: [],
  activity: [],
  priority: [0, 1000],
  categoryRecords: [],
  age: [0, 150],
  visitsCount: [0, 1_000_000],
  format: [],
  status: [],
};

export function DataTable({ allFilters }: { allFilters: ClientFilters }) {
  const tColumnsData = getColumns(toggleTableItem).map(({ header }) => String(header));
  const methods = useForm<TableHeaderForm>({ defaultValues: { tColumns: tColumnsData } });
  const tColumns = methods.watch('tColumns');

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [sortedColumn, setSortedColumn] = useState<null | SortedType>(null);

  const [activeRow, setActiveRow] = useState<ActiveRow | null>(null);

  useEffect(() => {
    const generated = generateClientTableData(20);
    setRowData(generated);
  }, []);

  const filteredRow = useMemo(() => {
    return filterClients(allFilters, rowData);
  }, [allFilters, rowData, sortedColumn]);

  const filteredColumns = useMemo(() => {
    return filterTableHeader(tColumns, toggleTableItem);
  }, [tColumns]);

  const table = useReactTable({
    data: filteredRow || [],
    columns: filteredColumns || [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (rowData.length === 0) {
    return <div className="m-auto">Loading...</div>;
  }

  function toggleTableItem(nameId: string) {
    setRowData((prev) =>
      prev.map((cellItem) =>
        cellItem.names === nameId ? { ...cellItem, disabled: !cellItem.disabled } : cellItem,
      ),
    );
  }

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
    <Form {...methods}>
      <div className="rounded-md border bg-white border-gray-200 h-full flex-1 overflow-y-auto w-full flex-shrink-0">
        <div className="flex gap-2 items-center py-6 px-5">
          <Heading>Напоминание о визите</Heading>
          <Heading color="gray">{`${filteredRow.length}`}</Heading>
          <div className="ml-auto">
            <FilterSelect
              icon={<SettingIcon />}
              placeholder="Данные"
              name="tColumns"
              items={tColumnsData}
            />
          </div>
        </div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}>
          <SortableContext
            items={rowData.map((row) => row.names)}
            strategy={verticalListSortingStrategy}>
            <Table className="min-w-0 w-full">
              <TableHead
                table={table}
                sortedColumn={sortedColumn}
                setSortedColumn={setSortedColumn}
                rowData={rowData}
                setRowData={setRowData}
              />
              <TableBody table={table} />
            </Table>

            <TableRowDragOverlay activeRow={activeRow} />
          </SortableContext>
        </DndContext>
      </div>
    </Form>
  );
}

const TableRowDragOverlay = ({ activeRow }: { activeRow: ActiveRow | null }) => {
  return (
    <DragOverlay>
      {activeRow && (
        <table>
          <tbody>
            <tr className="bg-white border-1">
              <td className="py-5 pl-4 pr-3 cursor-grab grid place-items-center">
                <IconBurger />
              </td>
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
          </tbody>
        </table>
      )}
    </DragOverlay>
  );
};
