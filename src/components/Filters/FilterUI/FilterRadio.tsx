import * as RadioGroup from '@radix-ui/react-radio-group';
import { AccordionHeader } from '@radix-ui/react-accordion';
import { Controller, FieldValues, Path, useFormContext, useWatch } from 'react-hook-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/Typography/Text';

interface FilterRadioProps<T> {
  name: Path<T>;
  title: string;
  data: string[];
}

export const FilterRadio = <T extends FieldValues>({ name, data, title }: FilterRadioProps<T>) => {
  const { control, setValue } = useFormContext();

  function handleChange(e: string) {
    setValue(name, [e] as any);
  }

  return (
    <Accordion
      className="bg-white flex flex-col gap-2 p-3 rounded-[12px]"
      type="single"
      collapsible>
      <AccordionItem value="item-1">
        <AccordionHeader className="flex items-center gap-1 justify-between">
          <Text>{title}</Text>
          <AccordionTrigger className="p-0 cursor-pointer" />
        </AccordionHeader>

        <AccordionContent className="flex flex-col gap-2 pb-0  pt-2">
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <RadioGroup.Root
                {...field}
                onValueChange={handleChange}
                value={field.value[0] ?? ''}
                className="flex flex-col gap-2">
                {data.map((data, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <RadioGroup.Item
                      value={data}
                      id={data}
                      className="w-5 h-5 rounded-full border border-[rgba(128,151,177,1)] flex items-center justify-center focus:outline-none">
                      <RadioGroup.Indicator className="w-3 h-3 bg-[rgba(102,111,232,1)] rounded-full" />
                    </RadioGroup.Item>
                    <label htmlFor={data} className="select-none cursor-pointer">
                      <Text>{data}</Text>
                    </label>
                  </div>
                ))}
              </RadioGroup.Root>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
