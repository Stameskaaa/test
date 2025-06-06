import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';

interface FilterInputProps<T> {
  name: Path<T>;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
}

export const FilterInput = <T extends FieldValues>({
  name,
  placeholder,
  icon,
  className, // ← достаём
}: FilterInputProps<T>) => {
  const methods = useFormContext();

  return (
    <div className="flex-1 flex relative">
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => (
          <Input
            style={{ lineHeight: '24px', fontSize: '16px' }}
            className={`h-auto placeholder:text-[var(--color-gray)] border-none leading-6 text-base bg-[var(--color-white)] text-[var(--color-gray)] px-5 py-3 rounded-[12px] ${
              icon ? 'pr-14' : ''
            } ${className || ''}`}
            {...field}
            placeholder={placeholder}
          />
        )}
      />
      {icon && <div className="absolute right-5 bottom-[14px]">{icon}</div>}
    </div>
  );
};
