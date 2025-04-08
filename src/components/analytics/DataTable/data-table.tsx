"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { TFilters } from "./types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showFilterButton?: boolean;
  titleSearchBar?: string;
  searchInColumn?: string;
  filters?: TFilters;
  currentPage?: number;
  totalPags?: number;
  onPageChange?: (page: number) => void;
  borderless?: boolean;
  onSortingChange?: (sorting: SortingState) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  borderless = false,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      if (onSortingChange) {
        onSortingChange(newSorting);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const isActionsColumn = (columnId: string) => {
    return (
      columnId === "actions" ||
      columnId === "isActive" ||
      columnId === "status" ||
      columnId === "select" ||
      columnId === "id"
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div>
        <Table
          className={`rounded-md bg-neutral-0 sm:overflow-x-auto ${
            borderless
              ? "border-b border-neutral-200"
              : "border border-neutral-200"
          }`}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-neutral-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="!text-left bg-neutral-100"
                  >
                    {header.isPlaceholder ? null : (
                      <div onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-neutral-200">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.minSize ?? "auto",
                        maxWidth: cell.column.columnDef.maxSize ?? "auto",
                        width: cell.column.columnDef.size ?? "auto",
                      }}
                    >
                      <div className="max-h-[40px] py-0 overflow-y-auto !line-clamp-1">
                        {isActionsColumn(cell.column.id) ? (
                          <div>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              align="center"
                              side="top"
                              sideOffset={25}
                              className="max-w-[30vw] text-center text-wrap"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center md:h-[30vh]"
                >
                  Nenhum dado encontrado!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* <ScrollBar orientation="horizontal" /> */}
      </div>
    </div>
  );
}
