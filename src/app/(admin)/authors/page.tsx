"use client";

import { DataTable } from "@/components/analytics/DataTable/data-table";
import { AlertModal } from "@/components/analytics/Modals/alertModal";
import { Pagination } from "@/components/analytics/Pagination";
import {
  useCreateAuthor,
  useDeleteAuthor,
  useEditAuthor,
  usePaginatedAuthors,
} from "@/services/queries/author/hook";
import { IAuthor } from "@/utils/types/authors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { columnsAuthors } from "./analytics/_array/columnsAuthor";
import { ModalAddAuthor } from "./analytics/components/ModalAddAuthor";
import { HeaderPage } from "@/components/analytics/HeaderPage";
import { SkeletonTable } from "@/components/analytics/SkeletonComponent/SkeletonTable";

const formSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  nationality: z.string().min(4, "Nacionalidade obrigatória"),
  birthdate: z.string(),
});

export type FormDataAuthor = z.infer<typeof formSchema>;

const Authors = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAlertModalDelete, setOpenAlertModalDelete] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any | null>(null);
  const [deleteAuthor, setDeleteAuthor] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("createdAt,desc");

  // MUTATIONS
  const { mutate: mutateCreateAuthor } = useCreateAuthor();
  const { mutate: mutateEditAuthor } = useEditAuthor();
  const { mutate: mutateDeleteAuthor } = useDeleteAuthor();

  // QUERRY
  const {
    data: allAuthors,
    isLoading,
    error,
  } = usePaginatedAuthors(page, size, sort);

  const form = useForm<FormDataAuthor>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nationality: "",
      birthdate: "",
    },
  });

  const handleEditAuthors = (author: IAuthor) => {
    setEditingAuthor(author);
    form.setValue("name", author.name);
    form.setValue("nationality", author.nationality);
    form.setValue("birthdate", author.birthdate);
    setSort("createdAt,desc"); // temp
    setOpenModal(true);
  };

  const handleDeleteAuthors = (id: string) => {
    setDeleteAuthor(id);
    setOpenAlertModalDelete(true);
  };

  const confirmDelete = () => {
    try {
      if (deleteAuthor) {
        mutateDeleteAuthor(deleteAuthor, {
          onSuccess: () => {
            setDeleteAuthor(null);
            setOpenAlertModalDelete(false);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FormDataAuthor> = (data) => {
    if (editingAuthor) {
      mutateEditAuthor(
        {
          id: editingAuthor.id,
          data,
        },
        {
          onSuccess: () => {
            form.reset();
            setOpenModal(false);
          },
        }
      );
    } else {
      mutateCreateAuthor(data, {
        onSuccess: () => {
          form.reset();
          setOpenModal(false);
        },
        onError: (error) => {
          console.log("error ->", error);
        },
      });
    }
  };

  if (isLoading)
    return (
      <div>
        <SkeletonTable />
      </div>
    );
  if (error) return <div>Erro ao carregar autores</div>;

  return (
    <div className="flex flex-col items-center justify-start gap-20 w-full h-full pt-10">
      <HeaderPage
        title="Autores"
        textButton="Adicionar Autor"
        setOpenModal={setOpenModal}
        form={form}
      />

      <div className="w-full space-y-4">
        <DataTable
          columns={columnsAuthors(handleEditAuthors, handleDeleteAuthors)}
          data={allAuthors?.content || []}
          borderless
        />

        {allAuthors && (
          <Pagination
            totalPages={allAuthors.totalPages}
            currentPage={page}
            pageSize={size}
            onPageChange={setPage}
            onSizeChange={(newSize: number) => {
              setSize(newSize);
              setPage(0);
            }}
          />
        )}
      </div>

      {openModal && (
        <ModalAddAuthor
          open={openModal}
          setOpen={setOpenModal}
          form={form}
          handleFormSubmit={onSubmit}
        />
      )}

      {/* Alert Modal */}
      {openAlertModalDelete && (
        <AlertModal
          titleModal="Excluir Autor"
          descriptionModal="Deseja realmente excluír o Autor? Esta ação não poderá ser desfeita."
          isOpen={openAlertModalDelete}
          onClose={() => setOpenAlertModalDelete(false)}
          textButtonCancel="Cancelar"
          textButtonConfirm="Excluir"
          variantButtonConfirm="destructive"
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default Authors;
