import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { TextareaHTMLAttributes } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
// import { Textarea } from "@repo/ui";
// import { ScrollArea } from "../../../../../../../packages/web-ds/src/components/ScrollArea";

type TextareaFormProps<T extends FieldValues> = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> &
  UseControllerProps<T> & {
    label?: string;
    placeholder?: string;
    height?: number | string;
    resize?: "none" | "both" | "horizontal" | "vertical";
  };

function TextareaForm<T extends FieldValues>({
  label,
  placeholder = "Digite...",
  height,
  resize = "none",
  ...props
}: TextareaFormProps<T>) {
  const { fieldState } = useController(props);

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>{label ? label : null}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={`w-full rounded-sm resize-${resize} ${
                fieldState.error ? "border-red-400 focus:border-red-400" : ""
              }`}
              style={{ height }}
              {...field}
            />
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}

export { TextareaForm };
