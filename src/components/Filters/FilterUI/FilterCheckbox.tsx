import React from 'react';
import { AccordionHeader } from '@radix-ui/react-accordion';
import { useFormContext, Controller, useWatch, Path, FieldValues } from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/Typography/Text';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterCheckboxProps<T> {
  title: string;
  name: Path<T>;
  data: string[];
}

export const FilterCheckbox = <T extends FieldValues>({
  name,
  data,
  title,
}: FilterCheckboxProps<T>) => {
  const { control, setValue } = useFormContext();
  const selectedItems: string[] = useWatch({ name, control }) || [];

  const toggleCheckbox = (data: string) => {
    if (selectedItems.includes(data)) {
      setValue(name, selectedItems.filter((id) => id !== data) as any);
    } else {
      setValue(name, [...selectedItems, data] as any);
    }
  };

  return (
    <Accordion
      className="bg-white flex flex-col gap-2 p-3 rounded-[12px]"
      type="single"
      collapsible>
      <AccordionItem value="item-1">
        <div className="flex flex-col gap-[4px]">
          <AccordionHeader className="flex items-center gap-1 justify-between">
            <Text>{title}</Text>
            <AccordionTrigger className="p-0 cursor-pointer" />
          </AccordionHeader>

          <AccordionContent className="flex flex-col gap-2 pb-0">
            {data.map((item, index) => (
              <label key={index} className="h-[20px] flex items-center gap-1.5 cursor-pointer">
                <Controller
                  name={name}
                  control={control}
                  render={() => (
                    <Checkbox
                      checked={selectedItems.includes(item)}
                      onCheckedChange={() => toggleCheckbox(item)}
                    />
                  )}
                />
                <Text>{item}</Text>
              </label>
            ))}
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
};
