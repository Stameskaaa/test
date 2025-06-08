import { Row } from '@tanstack/react-table';

export interface TableHeaderForm {
  tColumns: string[];
}

export interface SortedType {
  name: RowDataKeys;
  sort: 'asc' | 'desc';
}
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
  disabled: boolean;
}

export type RowDataKeys = keyof RowData;

export type ActiveRow = { row: Row<RowData>; width: number | null };
