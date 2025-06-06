import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { FilterSelect } from './FilterUI/FilterSelect';
import { FilterIcon, Plus, Search, Xmark } from '@/icons/icons';
import { FilterInput } from './FilterUI/FilterInput';
import { Sheet, SheetTrigger } from '../ui/sheet';
import { FilterSheet } from './FilterUI/FilterSheet';
import { inputFilterMock } from '@/mock/data';
import { ClientFilters } from '@/pages/[[...slug]]';

const defaultValuesForm: ClientFilters = {
  name: '',
  categoryClient: [],
  male: [],
  masters: [],
  services: [],
  activity: [],
  priority: [0, 100],
  categoryRecords: [],
  age: [0, 100],
  visitsCount: [0, 100],
  format: [],
  status: [],
};

export const Filters = ({
  setAllFilters,
}: {
  setAllFilters: React.Dispatch<React.SetStateAction<ClientFilters>>;
}) => {
  const methods = useForm<ClientFilters>({ defaultValues: defaultValuesForm });
  const [openModal, setOpenModal] = useState(false);
  const { reset, getValues } = methods;

  function handleSetFilters() {
    const values = getValues();
    setAllFilters((prev) => ({ ...prev, ...values }));
  }

  return (
    <Form {...methods}>
      <div className="w-full flex flex-col gap-5">
        <div className="flex-1 flex gap-3 items-center flex-wrap">
          <FilterInput name="name" placeholder="Введите наименование" icon={<Search />} />
          <Button className="w-[220px]" size="lg" textSize="large" variant="filled">
            {' '}
            <Plus /> Создать новое
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 gap-4 flex-wrap">
            {inputFilterMock.map((props, index) => (
              <FilterSelect {...props} key={index} />
            ))}
          </div>
          <div className="flex items-center flex-1 justify-between  flex-wrap">
            <Sheet open={openModal} onOpenChange={setOpenModal}>
              <SheetTrigger asChild>
                <Button variant="text">
                  <FilterIcon /> Все фильтры
                </Button>
              </SheetTrigger>
              <FilterSheet setOpenModal={setOpenModal} setAllFilters={setAllFilters} />
            </Sheet>

            <Button onClick={handleSetFilters} className="w-40" variant="filled">
              Применить
            </Button>
            <Button onClick={() => reset({})} variant="text">
              <FilterIcon /> Очистить фильтры <Xmark />
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
