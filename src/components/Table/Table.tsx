import { SettingIcon } from '@/icons/icons';
import { useEffect, useMemo, useState } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DndContext, closestCenter, DragEndEvent, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useForm } from 'react-hook-form';
import { ClientFilters } from '@/pages/[[...slug]]';
import { RowData, SortedType, TableHeaderForm } from './types';
import { TableRow } from './TableRow';
import { getColumns } from '@/mock/data';
import { filterClients, filterTableHeader, generateClientTableData } from '@/helpers/helpers';
import { Table, TableBody, TableCell, TableRow as TableRowComponent } from '@/components/ui/table';
import { Heading } from '../Typography/Heading';
import { FilterSelect } from '../Filters/FilterUI/FilterSelect';
import { Form } from '../ui/form';
import { TableHead } from './TableHead';

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
  const { setNodeRef } = useDroppable({
    id: 'clientsTable',
  });
  const tColumnsData = getColumns(toggleTableItem).map(({ header }) => String(header));
  const methods = useForm<TableHeaderForm>({ defaultValues: { tColumns: tColumnsData } });
  const tColumns = methods.watch('tColumns');

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [sortedColumn, setSortedColumn] = useState<null | SortedType>(null);

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
        <Table className="min-w-0  w-ful ">
          <TableHead
            table={table}
            sortedColumn={sortedColumn}
            setSortedColumn={setSortedColumn}
            rowData={rowData}
            setRowData={setRowData}
          />
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={rowData.map((row) => row.names)}
              strategy={verticalListSortingStrategy}>
              <TableBody ref={setNodeRef}>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => <TableRow row={row} key={row.id} />)
                ) : (
                  <TableRowComponent>
                    <TableCell colSpan={tColumnsData.length} className="h-24 text-center">
                      -
                    </TableCell>
                  </TableRowComponent>
                )}
              </TableBody>
            </SortableContext>
          </DndContext>
        </Table>
      </div>
    </Form>
  );
}
