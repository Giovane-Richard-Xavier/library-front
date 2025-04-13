import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAuthor } from "@/utils/types/authors";
import { IonIcon } from "@ionic/react";
import { ColumnDef } from "@tanstack/react-table";
import { ellipsisHorizontal, pencil, trash } from "ionicons/icons";
import { format } from "date-fns";

export const columnsAuthors = (
  handleEditAuthors: (author: IAuthor) => void,
  handleDeleteAuthors: (uuid: string) => void
): ColumnDef<IAuthor>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Nome
      </Button>
    ),
  },
  {
    accessorKey: "nationality",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Nacionalidade
      </Button>
    ),
  },
  {
    accessorKey: "birthdate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        Data de Nascimento
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{format(row.getValue("birthdate"), "dd/MM/yyyy")}</div>;
    },
  },
  {
    accessorKey: "actions",
    size: 20,
    header: () => <div className="text-right mr-20">Ações</div>,
    cell: ({ row }) => {
      const author = row.original;

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
                onClick={() => handleEditAuthors(author)}
              >
                <IonIcon size="small" icon={pencil} />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-10"
                onClick={() => handleDeleteAuthors(author.id)}
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
