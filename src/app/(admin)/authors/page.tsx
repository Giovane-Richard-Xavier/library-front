"use client";

import { DataTable } from "@/components/analytics/DataTable/data-table";
import { useAllAuthors } from "@/services/queries/author/hook";
import { IAuthor } from "@/utils/types/authors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { columnsAuthors } from "./analitics/_array/columnsAuthor";
import { ModalAddAuthor } from "./analitics/components/ModalAddAuthor";

const formSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  nationality: z.string().min(4, "Nacionalidade obrigatória"),
  birthdate: z.string(),
});

export type FormDataAuthor = z.infer<typeof formSchema>;

const Authors = () => {
  const [openModal, setOpenModal] = useState(false);

  // QUERRY
  const { data: allAuthors, isLoading, error } = useAllAuthors();

  console.log("allAuthors ->", allAuthors);

  const form = useForm<FormDataAuthor>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nationality: "",
      birthdate: "",
    },
  });

  const handleEditAuthors = (author: IAuthor) => {
    // setSelectedItem(dfd);
    console.log("autor ->", author);
  };

  const handleDeleteAuthors = (uuid: string) => {
    // setDFDToDelete(id);
    console.log("uuid ->", uuid);
  };

  const onSubmit: SubmitHandler<FormDataAuthor> = (data) => {
    console.log("data ->", data);
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar autores</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-20 w-full h-full">
      <div className="flex items-center justify-between w-full px-4 py-5 border border-neutral-200 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Autores</h1>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer"
          onClick={() => {
            setOpenModal(true);
            form.reset();
          }}
        >
          Adicionar Autor
        </button>
      </div>

      <DataTable
        columns={columnsAuthors(handleEditAuthors, handleDeleteAuthors)}
        data={allAuthors || []}
        borderless
      />
      {openModal && (
        <ModalAddAuthor
          open={openModal}
          setOpen={setOpenModal}
          form={form}
          handleFormSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default Authors;
