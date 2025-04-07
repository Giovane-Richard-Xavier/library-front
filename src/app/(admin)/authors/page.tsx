"use client";

import { DataTable } from "@/components/analytics/DataTable/data-table";
import React, { useState } from "react";
import { columnsAuthors } from "./analitics/_array/columnsAuthor";
import { IAuthor } from "@/utils/types/authors";
import { Modal } from "@/components/analytics/Modals/modalBase";
import { Button } from "@/components/ui/button";

const Authors = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleEditAuthors = (author: IAuthor) => {
    // setSelectedItem(dfd);
    console.log("autor ->", author);
  };

  const handleDeleteAuthors = (uuid: string) => {
    // setDFDToDelete(id);
    console.log("uuid ->", uuid);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-20 w-full h-full">
      <div className="flex items-center justify-between w-full px-4 py-5 border border-neutral-200 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Autores</h1>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Adicionar Autor
        </button>
      </div>

      <DataTable
        columns={columnsAuthors(handleEditAuthors, handleDeleteAuthors)}
        data={[]}
        borderless
      />
      {openModal && (
        <Modal
          open={openModal}
          onOpen={setOpenModal}
          // title="Adicionar Autor"
          description="Adicione um novo autor"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </>
          }
        >
          teste
        </Modal>
      )}
    </div>
  );
};

export default Authors;
