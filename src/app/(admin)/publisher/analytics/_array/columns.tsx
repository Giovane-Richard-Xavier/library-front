"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPublisher } from "@/utils/types/publisher";
import { IonIcon } from "@ionic/react";
import { ColumnDef } from "@tanstack/react-table";
import { ellipsisHorizontal, pencil, trash } from "ionicons/icons";
import { format } from "date-fns";

export const columnsPublishers = (
  handleEditPublisher: (publisher: IPublisher) => void,
  handleDeletePublisher: (id: string) => void
): ColumnDef<IPublisher>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Nome da editora
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Criado em
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{format(row.getValue("createdAt"), "dd/MM/yyyy")}</div>;
    },
  },
  {
    accessorKey: "actions",
    size: 20,
    header: () => <div className="text-right mr-20">Ações</div>,
    cell: ({ row }) => {
      const publisher = row.original;

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
                onClick={() => handleEditPublisher(publisher)}
              >
                <IonIcon size="small" icon={pencil} />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-10"
                onClick={() => handleDeletePublisher(publisher.id)}
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
