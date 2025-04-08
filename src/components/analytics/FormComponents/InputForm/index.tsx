"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IonIcon } from "@ionic/react";

("@repo/ui");
import { eye, eyeOff } from "ionicons/icons";
import { useState } from "react";
import {
  useController,
  UseControllerProps,
  type FieldValues,
} from "react-hook-form";
import InputMask from "react-input-mask";

type AllowedInputType =
  | "text"
  | "password"
  | "number"
  | "email"
  | "date"
  | "search"
  | "datetime-local";

interface InputFormProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  icon?: string;
  type?: AllowedInputType;
  placeholder?: string;
  mask?: string;
  disabled?: boolean;
}

function InputForm<T extends FieldValues>({
  label,
  icon,
  type = "text",
  placeholder,
  mask,
  disabled = false,
  ...props
}: InputFormProps<T>) {
  const { field, fieldState } = useController(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;

    if (type === "number") {
      value = e.target.value === "" ? "" : Number(e.target.value);
    }

    field.onChange(value);
  };

  const InputComponent = mask ? InputMask : Input;

  return (
    <FormField
      control={props.control}
      name={props.name}
      render={() => (
        <FormItem className="relative">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <InputComponent
                {...field}
                {...props}
                className={`w-full h-10 rounded-sm border border-neutral-300 py-[10px] px-[10px] pr-[2rem] text-[14px] ring-offset-white placeholder:text-neutral-400 focus-visible:outline-none focus:border-primary-200 focus-visible:ring-1 focus-visible:ring-offset-0 focus:ring-primary-200 ${
                  disabled
                    ? "cursor-not-allowed opacity-50 bg-neutral-100"
                    : "bg-white"
                } ${icon ? "pr-[2rem]" : ""} ${
                  fieldState.error
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : ""
                } `}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                placeholder={placeholder}
                onChange={handleChange}
                mask={mask as string}
                disabled={disabled}
              />
              {icon && (
                <div className="absolute top-2/3 transform -translate-y-2/3 right-[10px] text-neutral-400">
                  <IonIcon icon={icon} size="small" />
                </div>
              )}
              {type === "password" && (
                <button
                  className="absolute top-2/3 transform -translate-y-2/3 right-[10px] text-neutral-400"
                  onClick={togglePasswordVisibility}
                  type="button"
                  disabled={disabled}
                >
                  <IonIcon icon={showPassword ? eye : eyeOff} size="small" />
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}

export { InputForm };
