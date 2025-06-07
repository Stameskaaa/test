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
import { SettingIcon } from '@/icons/icons';
import { ClientFilters } from '@/pages/[[...slug]]';
import { columns } from '@/mock/data';
import { useMemo } from 'react';
import { filterClients, filterTableHeader } from '@/helpers/helpers';

export interface RowData {
  priority: string;
  sendTime: string;
  visitsCount: number;
  gender: string;
  age: number;
  clientCategories: string;
  masters: string;
  services: string;
  actions: React.ReactNode;
  names: string;
  status: string;
  format: string;
  activity: string;
  categoryRecords: string;
}

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

const tColumnsData = columns.map(({ header }) => String(header));

interface TableHeaderForm {
  tColumns: string[];
}

export function DataTable({
  allFilters,
  initialData,
}: {
  allFilters: ClientFilters;
  initialData: RowData[];
}) {
  const methods = useForm<TableHeaderForm>({ defaultValues: { tColumns: tColumnsData } });
  const tColumns = methods.watch('tColumns');
  const filteredRow = useMemo(() => {
    return filterClients(initialData, allFilters);
  }, [allFilters]);
  const filteredColumns = useMemo(() => {
    return filterTableHeader(tColumns);
  }, [tColumns]);

  const table = useReactTable({
    data: filteredRow,
    columns: filteredColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Form {...methods}>
      <div className="rounded-md border bg-white border-gray-200 h-full flex-1 overflow-auto w-full flex-shrink-0">
        <div className="flex gap-2 items-center py-6 px-5">
          <Heading>Напоминание о визите</Heading>{' '}
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
        <Table className="min-w-0  w-full ">
          <TableHeader className="py-3 h-[56px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="min-w-0  truncate pl-0 pr-3">
                    <Text nowrap={false} size="sm" color="gray">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
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
                      <Text alignment="left" size="xs" className="truncate">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Text>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
