import { RowData } from '@/components/Table/Table';
import { clientCategories, genders, masters, services } from '@/mock/data';
import { ClientFilters } from '@/pages/[[...slug]]';

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomChoice = <T>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

export const randomBool = () => Math.random() < 0.5;

export const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const generateClientTableData = (count: number = 100): RowData[] => {
  return Array.from({ length: count }).map((_, i) => {
    return {
      names: `Клиент ${i + 1}`,
      priority: `${randomInt(0, 1000)}`,
      sendTime: randomDate(new Date(2023, 0, 1), new Date()).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      visitsCount: randomInt(0, 1_000_000),
      gender: randomChoice(genders),
      age: randomInt(18, 90),
      clientCategories: randomChoice(clientCategories),
      masters: randomChoice(masters),
      services: randomChoice(services),
      actions: null,
    };
  });
};

export function filterClients(
  data: RowData[],
  filters: ClientFilters & { category?: string[] },
): RowData[] {
  return data.filter((client) => {
    const ageMatch = client.age >= filters.age[0] && client.age <= filters.age[1];
    const visitsMatch =
      client.visitsCount >= filters.visitsCount[0] && client.visitsCount <= filters.visitsCount[1];
    const genderMatch = !filters.male.length || filters.male.includes(client.gender as any);
    // const categoryClientMatch =
    // !filters.categoryClient.length || filters.categoryClient.includes(client.clientCategories);
    // const categoryMatch =
    //   !filters.category?.length || filters.category.includes(client.clientCategories);
    const masterMatch = !filters.masters.length || filters.masters.includes(client.masters);
    // const serviceMatch = !filters.services.length || filters.services.includes(client.services);
    const priorityMatch =
      parseInt(client.priority) >= filters.priority[0] &&
      parseInt(client.priority) <= filters.priority[1];
    const nameMatch =
      !filters.name || client.names.toLowerCase().includes(filters.name.toLowerCase());

    return (
      ageMatch &&
      visitsMatch &&
      genderMatch &&
      // categoryClientMatch &&
      // categoryMatch &&
      masterMatch &&
      // serviceMatch &&
      priorityMatch &&
      nameMatch
    );
  });
}
