import React, { ReactNode } from 'react';
import { FormControl, FormField, FormItem } from '../../ui/form';
import { Select, SelectContent, SelectTrigger } from '../../ui/select';
import { useFormContext } from 'react-hook-form';
import { Text } from '../../Typography/Text';
import { Checkbox } from '../../ui/checkbox';
import { ClientFilters } from '@/pages/[[...slug]]';

interface FilterSelectProps {
  name: keyof ClientFilters;
  items: string[];
  placeholder?: string;
  icon?: ReactNode;
}

export const FilterSelect = ({
  name,
  items,
  placeholder = 'Выберите...',
  icon,
}: FilterSelectProps) => {
  const methods = useFormContext<ClientFilters>();

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const selectedValues = Array.isArray(value) ? value : [];

        const isSingleSelect = name === 'male' || name === 'activity';

        function toggleValue(itemValue: string) {
          let updated;
          if (isSingleSelect) {
            updated = selectedValues.includes(itemValue) ? [] : [itemValue];
          } else {
            updated = selectedValues.includes(itemValue)
              ? selectedValues.filter((val) => val !== itemValue)
              : [...selectedValues, itemValue];
          }
          onChange(updated);
        }

        function getDisplayValues() {
          if (selectedValues.length > 0) {
            if (selectedValues.length > 3) {
              return selectedValues.slice(0, 2).join(', ') + '...';
            } else {
              return selectedValues.join(', ');
            }
          } else {
            return placeholder;
          }
        }

        return (
          <FormItem className="flex-1 flex-shrink-0">
            <Select>
              <FormControl>
                <SelectTrigger className="w-full rounded-xl bg-[var(--color-white)]">
                  {icon && icon}
                  <Text className="w-full truncate" alignment="left" size="sm" color="gray">
                    {getDisplayValues()}
                  </Text>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="w-full rounded-xl bg-[var(--color-white)]">
                {items?.map((item) => (
                  <div
                    key={item}
                    onClick={() => toggleValue(item)}
                    className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-muted">
                    <Checkbox
                      checked={selectedValues.includes(item)}
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        );
      }}
    />
  );
};
