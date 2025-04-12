"use client";

import { DataTable } from "@/components/analytics/DataTable/data-table";
import { HeaderPage } from "@/components/analytics/HeaderPage";
import { AlertModal } from "@/components/analytics/Modals/alertModal";
import { Pagination } from "@/components/analytics/Pagination";
import { IPublisher } from "@/utils/types/publisher";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { columnsPublishers } from "./analytics/_array/columnsAuthor";

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

  // QUERIES

  const form = useForm<FormDataPublisher>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleEditPublisher = (publisher: IPublisher) => {};

  const handleDeleteublisher = (id: string) => {};

  const confirmDelete = () => {};

  return (
    <div className="flex flex-col items-center justify-center gap-20 w-full h-full">
      <HeaderPage
        title="Editoras"
        textButton="Adicionar Editora"
        setOpenModal={setOpenModal}
        form={form}
      />

      <div className="w-full space-y-4">
        <DataTable
          columns={columnsPublishers(handleEditPublisher, handleDeleteublisher)}
          //   data={allAuthors?.content || []}
          data={[]}
          borderless
        />

        {/* {allAuthors && (
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
        )} */}
      </div>

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

export default Pubisher;
