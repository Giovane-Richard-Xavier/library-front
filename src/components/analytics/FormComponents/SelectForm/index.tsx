import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IOptions } from "@/utils/types/options";
import type { HTMLAttributes } from "react";
import {
  useController,
  UseControllerProps,
  type FieldValues,
} from "react-hook-form";

type SelectFormProps<T extends FieldValues> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> &
  UseControllerProps<T> & {
    label?: string;
    placeholder?: string;
    options: IOptions[];
    allowNone?: boolean;
    disabled?: boolean;
  };

function SelectForm<T extends FieldValues>({
  label,
  placeholder = "Selecione",
  options,
  allowNone = false,
  disabled = false,
  ...props
}: SelectFormProps<T>) {
  const { fieldState } = useController(props);

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>{label ? label : null}</FormLabel>
          <FormControl>
            <div className="relative">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  disabled={disabled}
                  className={`w-full z-50 ${
                    fieldState.error
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                      : ""
                  }`}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="z-50 w-[300px] tabl:w-full tabl:max-w-[638px] line-clamp-2 text-wrap">
                  {allowNone && <SelectItem value="none">Nenhum</SelectItem>}
                  {options.map((option) => (
                    <SelectItem
                      className="z-50 text-wrap"
                      key={option.value}
                      value={option.value as string}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}

export { SelectForm };
