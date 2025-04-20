"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatToBrazilianCurrency } from "@/utils/functions/formatToBrazilianCurrency";
import { IBook } from "@/utils/types/book";
import { IonIcon } from "@ionic/react";
import { ColumnDef } from "@tanstack/react-table";
import { ellipsisHorizontal, pencil, trash } from "ionicons/icons";
import Image from "next/image";

export const columnsBooks = (
  handleEditBooks: (author: IBook) => void,
  handleDeleteBooks: (uuid: string) => void
): ColumnDef<IBook>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Título
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Preço
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{formatToBrazilianCurrency(row.getValue("price"))}</div>;
    },
  },
  {
    accessorKey: "genre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Gênero Literário
      </Button>
    ),
    // cell: ({ row }) => {
    //   return <div>{format(row.getValue("birthdate"), "dd/MM/yyyy")}</div>;
    // },
  },
  {
    accessorKey: "bookCoverUrl",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Capa do Livro
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <Image
          src={row.getValue("bookCoverUrl")}
          width={50}
          height={60}
          alt="Capa do livro"
        ></Image>
      );
    },
  },
  {
    accessorKey: "actions",
    size: 20,
    header: () => <div className="text-right mr-20">Ações</div>,
    cell: ({ row }) => {
      const book = row.original;

      return (
        <div className="text-right font-medium mr-20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-[30px] w-[30px] p-0 bg-neutral-100 rounded-sm cursor-pointer outline-none"
              >
                <IonIcon
                  size="small"
                  icon={ellipsisHorizontal}
                  className="text-neutral-400 hover:text-neutral-600"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuItem
                className="gap-10"
                onClick={() => handleEditBooks(book)}
              >
                <IonIcon size="small" icon={pencil} />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-10"
                onClick={() => handleDeleteBooks(book.id)}
              >
                <IonIcon size="small" icon={trash} />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
