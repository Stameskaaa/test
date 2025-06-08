import React from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import { IconBurgerSmall } from '@/icons/icons';
import { RowData, RowDataKeys, SortedType } from './types';
import { sortClients } from '@/helpers/helpers';
import { Text } from '../Typography/Text';
import { TableHeader, TableHead as TableHeaderComponent, TableRow } from '../ui/table';

interface TableHeadProps {
  sortedColumn: null | SortedType;
  setSortedColumn: React.Dispatch<React.SetStateAction<null | SortedType>>;
  rowData: RowData[];
  setRowData: React.Dispatch<React.SetStateAction<RowData[]>>;
  table: Table<RowData>;
}

export const TableHead: React.FC<TableHeadProps> = ({
  sortedColumn,
  setSortedColumn,
  rowData,
  setRowData,
  table,
}) => {
  function sortTable(name: RowDataKeys) {
    if (sortedColumn && sortedColumn.name === name) {
      const sortedData = sortClients(rowData, {
        name,
        sort: sortedColumn.sort === 'desc' ? 'asc' : 'asc',
      });
      setSortedColumn({
        name,
        sort: sortedColumn.sort === 'desc' ? 'asc' : 'asc',
      });
      setRowData(sortedData);
    } else {
      const sortedData = sortClients(rowData, { name, sort: 'desc' });
      setSortedColumn({ name, sort: 'desc' });
      setRowData(sortedData);
    }
  }

  return (
    <TableHeader className="py-3 h-[56px]">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          <th className="py-5 pl-4 pr-3 max-w-[48px] h-full" />
          {headerGroup.headers.map((header) => (
            <TableHeaderComponent
              onClick={() => sortTable(header.column.id as RowDataKeys)}
              key={header.id}
              className="min-w-0  truncate pl-0 pr-3 cursor-pointer ">
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
            </TableHeaderComponent>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
