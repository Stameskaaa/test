import { SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Heading } from '../../Typography/Heading';
import { ArrowRight } from '@/icons/icons';
import { FilterSlider } from './FilterSlider';
import { FilterCheckbox } from './FilterCheckbox';
import { FilterRadio } from './FilterRadio';
import {
  activities,
  appointmentCategories,
  appointmentStatuses,
  clientCategories,
  creationFormats,
  genders,
  masters,
  services,
} from '@/mock/data';
import { ClientFilters } from '@/pages/[[...slug]]';
import { Button } from '@/components/ui/button';

export function FilterSheet({
  setAllFilters,
  setOpenModal,
}: {
  setAllFilters: React.Dispatch<React.SetStateAction<ClientFilters>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <SheetContent
      style={{ maxWidth: 'none' }}
      className="bg-[rgba(246,245,246,1)] w-[544px] max-w-[544px]"
      side="right">
      <SheetHeader className=" px-6 pt-5 pb-6 flex gap-9 flex-row border-none items-center">
        <Button variant="text" onClick={() => setOpenModal(false)}>
          <ArrowRight />
        </Button>

        <Heading size="h3">Фильтр</Heading>
      </SheetHeader>
      <div className="flex flex-col px-3 h-full overflow-y-auto gap-2">
        <FilterSlider title="Приоритет" min={0} max={1000} name="priority" />
        <FilterCheckbox title="Категории клиентов" name="categoryClient" data={clientCategories} />
        <FilterRadio title="Пол" name="male" data={genders} />

        <FilterSlider title="Возраст" min={0} max={150} name="age" />
        <FilterSlider title="Количество визитов" min={0} max={1000000} name="visitsCount" />
        <FilterCheckbox title="Мастера" name="masters" data={masters} />
        <FilterCheckbox title="Услуги" name="services" data={services} />
        <FilterRadio title="Формат" name="format" data={creationFormats} />
        <FilterCheckbox
          title="Категории записей"
          name="categoryRecords"
          data={appointmentCategories}
        />
        <FilterCheckbox title="Статус записи" name="status" data={appointmentStatuses} />
        <FilterRadio title="Активность" name="activity" data={activities} />

        <div className="mt-auto sticky bottom-0 flex flex-col w-full bg-[rgba(255,255,255,1)] p-3 gap-2 rounded-tl-[12px] shadow rounded-tr-[12px]">
          <Button variant="filled">Показать</Button>
          <Button variant="text">Сбросить фильтры</Button>
        </div>
      </div>
    </SheetContent>
  );
}
