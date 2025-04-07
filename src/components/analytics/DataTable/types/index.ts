import React from "react";

export type TFilters = {
  name: string;
  options: string[];
  selectedValue: string;
  onSelectChange: React.Dispatch<React.SetStateAction<string>>;
  toString: (value: string) => string;
}[];
