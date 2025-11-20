// components/forms/SelectField.tsx
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { label: string; value: string };

type SelectFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  control: Control<T>;
  error?: any;
  required?: boolean;
};

export const SelectField = <T extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
}: SelectFieldProps<T>) => {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={String(name)} className="form-label">{label}</Label>}

      <Controller
        name={name as Path<T>}
        control={control}
        rules={{
          required: required ? `Please select ${label?.toLowerCase() ?? "this option"}` : false,
        }}
        render={({ field }) => (
          <>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600 text-white">
                {options.map((option) => (
                  <SelectItem
                    value={option.value}
                    key={option.value}
                    className="focus:bg-gray-600 focus:text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default SelectField;
