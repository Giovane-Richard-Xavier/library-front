"use client";

import { DataTable } from "@/components/analytics/DataTable/data-table";
import { HeaderPage } from "@/components/analytics/HeaderPage";
import { AlertModal } from "@/components/analytics/Modals/alertModal";
import { Pagination } from "@/components/analytics/Pagination";
import { IPublisher } from "@/utils/types/publisher";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { columnsPublishers } from "./analytics/_array/columns";
import {
  useAllPaginatePublisher,
  useCreatePublisher,
  useDeletePublisher,
} from "@/services/queries/publisher/hook";
import { ModalAddPublisher } from "./analytics/components/modalAddPublisher";

const formSchema = z.object({
  name: z.string().min(4, "Nome obrigatório"),
});

export type FormDataPublisher = z.infer<typeof formSchema>;

const Pubisher = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAlertModalDelete, setOpenAlertModalDelete] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState<any | null>(null);
  const [deletePublisher, setDeletePublisher] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("createdAt,desc");

  // MUTATIONS
  const { mutate: mutateCreatePublisher } = useCreatePublisher();
  const { mutate: mutateDeletePublisher } = useDeletePublisher();

  // QUERIES
  const {
    data: allPublisher,
    isLoading,
    error,
  } = useAllPaginatePublisher(page, size, sort);

  const form = useForm<FormDataPublisher>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleEditPublisher = (publisher: IPublisher) => {
    setEditingPublisher(publisher);
    form.setValue("name", publisher.name);
    setOpenModal(true);
  };

  const handleDeleteublisher = (id: string) => {
    setDeletePublisher(id);
    setOpenAlertModalDelete(true);
  };

  const confirmDelete = () => {
    if (deletePublisher) {
      mutateDeletePublisher(deletePublisher, {
        onSuccess: () => {
          setEditingPublisher(null);
          setOpenAlertModalDelete(false);
        },
      });
    }
  };

  const onSubmit: SubmitHandler<FormDataPublisher> = (data) => {
    if (editingPublisher) {
      <></>;
    } else {
      mutateCreatePublisher(data, {
        onSuccess: () => {
          form.reset();
          setSort("createdAt,desc");
          setOpenModal(false);
        },
      });
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar autores</div>;

  return (
    <div className="flex flex-col items-center justify-start gap-20 w-full h-full pt-10">
      <HeaderPage
        title="Editoras"
        textButton="Adicionar Editora"
        setOpenModal={setOpenModal}
        form={form}
      />

      <div className="w-full space-y-4">
        <DataTable
          columns={columnsPublishers(handleEditPublisher, handleDeleteublisher)}
          data={allPublisher?.content || []}
          borderless
        />

        {allPublisher && (
          <Pagination
            totalPages={allPublisher.totalPages}
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
        <ModalAddPublisher
          open={openModal}
          setOpen={setOpenModal}
          form={form}
          handleFormSubmit={onSubmit}
        />
      )}

      {/* Alert Modal */}
      {openAlertModalDelete && (
        <AlertModal
          titleModal="Excluir Editora"
          descriptionModal="Deseja realmente excluír a Editora? Esta ação não poderá ser desfeita."
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

export default Pubisher;
