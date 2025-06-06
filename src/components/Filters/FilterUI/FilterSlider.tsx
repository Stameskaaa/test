import React from 'react';
import { Controller, FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { Slider } from '../../ui/slider';
import { Text } from '../../Typography/Text';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { AccordionHeader } from '@radix-ui/react-accordion';

interface FilterSliderProps<T> {
  name: Path<T>;
  title: string;
  min?: number;
  max?: number;
  className?: string;
  step?: number;
}

export const FilterSlider = <T extends FieldValues>({
  name,
  className,
  min = 0,
  title,
  max = 100,
  step = 1,
}: FilterSliderProps<T>) => {
  const { control, setValue, watch } = useFormContext<T>();

  const [from, to] = watch(name) || [min, max];

  return (
    <Accordion
      className="bg-white flex flex-col gap-1 p-3 rounded-[12px]"
      type="single"
      collapsible>
      <AccordionItem value="item-1">
        <AccordionHeader className="flex items-center gap-1">
          <Text>{title}</Text>
          <Button
            className="text-[rgba(128,151,177,1)] underline ml-auto"
            size="sm"
            variant="text"
            onClick={() => setValue(name, [min, max] as PathValue<T, Path<T>>)}>
            Сбросить
          </Button>
          <AccordionTrigger className="p-0 cursor-pointer" />
        </AccordionHeader>
        <AccordionContent>
          <div className="flex gap-3 items-center">
            <div className="flex flex-col flex-1">
              <Text size="sm" alignment="left">
                От
              </Text>
              <Input
                className="outline-0"
                type="number"
                value={from}
                onChange={(e) =>
                  setValue(name, [Number(e.target.value), to] as PathValue<T, Path<T>>)
                }
              />
            </div>

            <svg className="relative top-2.5" width="16" height="2" viewBox="0 0 16 2" fill="none">
              <path d="M0 1H16" stroke="#8097B1" />
            </svg>

            <div className="flex flex-col flex-1">
              <Text size="sm" alignment="left">
                До
              </Text>
              <Input
                type="number"
                value={to}
                onChange={(e) =>
                  setValue(name, [from, Number(e.target.value)] as PathValue<T, Path<T>>)
                }
              />
            </div>
          </div>

          <div className="h-6 flex items-center">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Slider
                  className={className}
                  value={field.value || [min, max]}
                  min={min}
                  max={max}
                  step={step}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
