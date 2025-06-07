import { RowData } from '@/components/Table/Table';
import { Text } from '@/components/Typography/Text';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  ActivityIcon,
  IconBurger,
  PointsIcon,
  ProfileIcon,
  ShowIcon,
  StarIcon,
} from '@/icons/icons';
import { ColumnDef } from '@tanstack/react-table';

export const genders = ['мужской', 'женский'];

export const clientCategories = [
  'vip',
  'постоянный',
  'инстаграмм',
  'приезжий',
  'без бороды',
  'проходил мимо',
  'был в другом салоне',
];

export const masters = [
  'Алексей',
  'Марина',
  'Сергей',
  'Екатерина',
  'Иван',
  'Роман',
  'Ирина',
  'Кирилл',
  'Михаил',
  'Анна',
];

export const services = [
  'мужская стрижка + моделирование бороды',
  'мужская стрижка + премиум моделирование бороды',
  'женская стрижка',
  'окрашивание волос',
  'укладка волос',
  'маникюр',
  'педикюр',
  'массаж головы',
  'бритьё бороды',
  'коррекция бороды',
  'детская стрижка',
  'стрижка усов',
];

export const creationFormats = ['онлайн', 'оффлайн'];

export const appointmentCategories = [
  'полная оплата',
  'частичная оплата',
  'сотрудник важен',
  'оплата смартфоном',
  'запись через call centre',
];

export const appointmentStatuses = ['ожидании', 'пришел', 'не пришел', 'подтвердил'];

export const activities = ['включена', 'отключена'];

export const inputFilterMock = [
  {
    icon: <StarIcon />,
    name: 'categoryClient',
    placeholder: 'Категории клиентов',
    items: clientCategories,
  },
  {
    icon: <StarIcon />,
    name: 'male',
    placeholder: 'Пол',
    items: genders,
  },
  {
    icon: <ProfileIcon />,
    name: 'masters',
    placeholder: 'Мастера',
    items: masters,
  },
  {
    icon: <ActivityIcon />,
    name: 'services',
    placeholder: 'Услуги',
    items: services,
  },
  {
    icon: <ActivityIcon />,
    name: 'activity',
    placeholder: 'Активность',
    items: activities,
  },
] as const;

export const columns: ColumnDef<RowData>[] = [
  {
    id: 'leftIcon',
    header: '',
    accessorKey: '',
    cell: () => (
      <div className="w-[36px] grid place-items-center pl-4">
        <IconBurger />
      </div>
    ),
    meta: {
      filterKey: '',
    },
  },
  {
    accessorKey: 'names',
    header: 'Наименование клиента',
    cell: ({ getValue, row }) => {
      const value = getValue<string>();
      const time = row.original.sendTime;
      return (
        <div className="flex flex-col">
          <Text alignment="left" size="sm">
            {value}
          </Text>
          <Text alignment="left" size="xs" color="gray">
            {time}
          </Text>
        </div>
      );
    },
    meta: {
      filterKey: 'Наименование клиента',
    },
  },
  {
    accessorKey: 'priority',
    header: 'Приоритет',
    meta: {
      filterKey: 'Приоритет',
    },
  },
  {
    accessorKey: 'sendTime',
    header: 'Время отправки',
    meta: {
      filterKey: 'Время отправки',
    },
  },
  {
    accessorKey: 'visitsCount',
    header: 'Кол-во визитов',
    meta: {
      filterKey: 'Кол-во визитов',
    },
  },
  {
    accessorKey: 'gender',
    header: 'Пол',
    meta: {
      filterKey: 'Пол',
    },
  },
  {
    accessorKey: 'age',
    header: 'Возраст',
    meta: {
      filterKey: 'Возраст',
    },
  },
  {
    accessorKey: 'clientCategories',
    header: 'Категория клиента',
    meta: {
      filterKey: 'Категория клиента',
    },
  },
  {
    accessorKey: 'masters',
    header: 'Мастер',
    meta: {
      filterKey: 'Мастер',
    },
  },
  {
    accessorKey: 'services',
    header: 'Услуга',
    meta: {
      filterKey: 'Услуга',
    },
  },
  {
    accessorKey: 'format',
    header: 'Формат создания',
    meta: {
      filterKey: 'Формат создания',
    },
  },
  {
    accessorKey: 'categoryRecords',
    header: 'Категория записи',
    meta: {
      filterKey: 'Категория записи',
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    meta: {
      filterKey: 'Статус',
    },
  },
  {
    accessorKey: 'activity',
    header: 'Активность',
    meta: {
      filterKey: 'Активность',
    },
  },
  {
    accessorKey: 'actions',
    header: 'Действия',
    cell: () => (
      <div className="flex gap-3 items-center">
        <Switch />
        <Button variant="text" className="bg-[rgba(235,238,246,1)] aspect-square p-2">
          <ShowIcon />
        </Button>
        <Button variant="text" className="bg-[rgba(235,238,246,1)] aspect-square p-2">
          <PointsIcon />
        </Button>
      </div>
    ),
    meta: {
      filterKey: 'Действия',
    },
  },
];
