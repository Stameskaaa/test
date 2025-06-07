import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Text } from '../Typography/Text';
import { Heading } from '../Typography/Heading';
import { FilterSelect } from '../Filters/FilterUI/FilterSelect';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { IconBurgerSmall, SettingIcon } from '@/icons/icons';
import { ClientFilters } from '@/pages/[[...slug]]';
import { getColumns } from '@/mock/data';
import { useEffect, useMemo, useState } from 'react';
import {
  filterClients,
  filterTableHeader,
  generateClientTableData,
  sortClients,
} from '@/helpers/helpers';
import { RowData, RowDataKeys, SortedType, TableHeaderForm } from './types';

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

  useEffect(() => {
    const generated = generateClientTableData(20);
    setRowData(generated);
  }, []);

  const filteredRow = useMemo(() => {
    return sortClients(filterClients(allFilters, rowData), sortedColumn);
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

  function sortTable(name: RowDataKeys) {
    if (sortedColumn && sortedColumn.name === name) {
      setSortedColumn({ name, sort: sortedColumn.sort === 'desc' ? 'asc' : 'asc' });
    } else {
      setSortedColumn({ name, sort: 'desc' });
    }
  }

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
        <Table className="min-w-0  w-ful">
          <TableHeader className="py-3 h-[56px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    onClick={() => sortTable(header.column.id as RowDataKeys)}
                    key={header.id}
                    className="min-w-0  truncate pl-0 pr-3 cursor-pointer">
                    <div className="flex gap-0.5 items-center">
                      {header.column.id !== 'leftIcon' && (
                        <IconBurgerSmall
                          color={sortedColumn?.name === header.column.id ? 'cyan' : 'default'}
                        />
                      )}
                      <Text
                        nowrap={false}
                        size="sm"
                        color={sortedColumn?.name === header.column.id ? 'cyan' : 'gray'}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </Text>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="min-w-0  truncate  pl-0 pr-3 py-3">
                      <Text
                        color={row.original.disabled ? 'gray' : undefined}
                        alignment="left"
                        size="xs"
                        className="truncate">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Text>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tColumnsData.length} className="h-24 text-center">
                  -
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Form>
  );
}
