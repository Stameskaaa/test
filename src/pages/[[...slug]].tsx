import { Filters } from '@/components/Filters/Filters';
import { DataTable, RowData } from '@/components/Table/Table';
import { generateClientTableData } from '@/helpers/helpers';
import { useEffect, useState } from 'react';

export interface SelectFilters {
  categoryClient: string[];
  male: ('мужской' | 'женский')[];
  name: string;
  masters: string[];
  services: string[];
  activity: ('включена' | 'отключена')[];
}

export interface ClientFilters extends SelectFilters {
  priority: [number, number];
  categoryRecords: (
    | 'полная оплата'
    | 'частичная оплата'
    | 'сотрудник важен'
    | 'запись через call centre'
    | 'оплата смартфоном'
  )[];
  age: [number, number];
  visitsCount: [number, number];
  format: ('онлайн' | 'оффлайн')[];
  status: ('ожидании' | 'пришел' | 'не пришел' | 'подтвердил')[];
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

export default function Home() {
  const [allFilters, setAllFilters] = useState<ClientFilters>(initialFilters);

  return (
    <div className="w-full h-full bg-[#F6F5F6]  flex flex-col gap-3">
      <Filters setAllFilters={setAllFilters} />
      <DataTable allFilters={allFilters} />
    </div>
  );
}
