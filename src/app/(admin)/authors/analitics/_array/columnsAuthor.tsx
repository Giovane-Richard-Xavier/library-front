import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IonIcon } from "@ionic/react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ellipsisVertical, eye } from "ionicons/icons";
// import { BadgeStatus } from "@components/BadgeStatus";

type TAuthor = {
  uuid: string;
  title: string;
  status: string;
  updated_at: string;
};

export const columnsAuthors = (
  handleEditAuthors: (author: TAuthor) => void,
  handleDeleteAuthors: (uuid: string) => void
): ColumnDef<TAuthor>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0"
      >
        DFD
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0 -ml-5"
      >
        Situação
      </Button>
    ),
    // cell: ({ row }) => {
    cell: () => {
      return (
        <div className="w-80">
          {/* <BadgeStatus status={row.getValue("status")} /> */}
        </div>
      );
    },
  },
  {
    accessorKey: "currentPhase",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0 -ml-5"
      >
        Fase atual
      </Button>
    ),
    cell: () => {
      return <div>Aguardando aprovação do PCA</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="!bg-transparent w-auto !text-left px-0 -ml-5"
      >
        Atualização
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{format(row.getValue("updated_at"), "dd/MM/yyyy")}</div>;
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
              <Button variant="ghost" className="h-30 w-30 p-0 bg-neutral-100">
                <span className="sr-only">Open menu</span>
                <IonIcon size="small" icon={ellipsisVertical} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuItem
                className="gap-10"
                onClick={() => handleEditAuthors(author)}
              >
                <IonIcon size="small" icon={eye} />
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-10"
                onClick={() => handleDeleteAuthors(author.uuid)}
              >
                <IonIcon size="small" icon={eye} />
                Visualizar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
