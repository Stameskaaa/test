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
import { filterClients } from '@/helpers/helpers';

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

export function DataTable({
  allFilters,
  initialData,
}: {
  allFilters: ClientFilters;
  initialData: RowData[];
}) {
  const methods = useForm();
  const filteredRow = useMemo(() => {
    return filterClients(initialData, allFilters);
  }, [allFilters]);

  const table = useReactTable({
    data: filteredRow,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Form {...methods}>
      <div className="rounded-md border bg-white border-gray-200 h-full flex-1 overflow-y-auto w-full flex-shrink-0">
        <div className="flex gap-2 items-center py-6 px-5">
          <Heading>Напоминание о визите</Heading>{' '}
          <Heading color="gray">{`${filteredRow.length}`}</Heading>
          <div className="ml-auto">
            <FilterSelect
              selectedItems={[{ text: 'text', value: '1' }]}
              icon={<SettingIcon />}
              placeholder="Данные"
              //@ts-ignore
              name="tColumns"
            />
          </div>
        </div>
        <Table className="min-w-0 table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="min-w-0 max-w-[100px] truncate"
                    // style={{ width: '100px' }}
                  >
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
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="min-w-0 max-w-[100px] truncate"
                      // style={{ width: '100px' }}
                    >
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
