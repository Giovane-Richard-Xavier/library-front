"use client";

import { DataTable } from "@/components/analytics/DataTable/data-table";
import { HeaderPage } from "@/components/analytics/HeaderPage";
import { AlertModal } from "@/components/analytics/Modals/alertModal";
import { Pagination } from "@/components/analytics/Pagination";
import { useAllAuthors } from "@/services/queries/author/hook";
import {
  useCreateBook,
  usePaginatedBooks,
} from "@/services/queries/books/hook";
import { useAllPublishers } from "@/services/queries/publisher/hook";
import { IBook } from "@/utils/types/book";
import { IOptions } from "@/utils/types/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { columnsBooks } from "./analytics/_array/columns";
import { ModalAddBooks } from "./analytics/components/ModalAddBooks";

const formSchema = z.object({
  isbn: z.string().min(4, "ISBN é obrigatório"),
  title: z.string().min(4, "Título é obrigatório"),
  publicationDate: z.string().min(4, "Título é obrigatório"),
  price: z.number().min(0, "O valor do livro é obrigatório"),
  genre: z.string().min(4, "O genero é obrigatório"),
  language: z.string().optional(),
  bookCoverUrl: z.string().min(4, "A capa do livro é obrigatório"),
  comment: z.string().min(4, "A review do livro é obrigatório"),
  author_id: z.string().min(1, "Selecione um autor"),
  publisher_id: z.string().min(1, "Selecione um autor"),
});

export type FormDataBook = z.infer<typeof formSchema>;

const Books = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAlertModalDelete, setOpenAlertModalDelete] = useState(false);
  const [editingBook, setEditingBook] = useState<any | null>(null);
  // const [deleteBook, setDeleteBook] = useState<string | null>(null);
  const [authorOptions, setAuthorOptions] = useState<IOptions[]>([]);
  const [publisherOptions, setPublisherOptions] = useState<IOptions[]>([]);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("createdAt,desc");

  // MUTATIONS
  const { mutate: mutateCreateBook } = useCreateBook();

  // QUERIES
  const {
    data: allBooks,
    isLoading,
    error,
  } = usePaginatedBooks(page, size, sort);
  const { data: allAuthor } = useAllAuthors();
  const { data: allPublishers } = useAllPublishers();

  const form = useForm<FormDataBook>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isbn: "",
      title: "",
      genre: "",
      bookCoverUrl: "",
      language: "",
      comment: "",
    },
  });

  const handleEditBooks = (book: IBook) => {
    setEditingBook(book);
    setSort("createdAt,desc"); // temp
  };

  const handleDeleteBooks = (id: string) => {
    console.log(id);
  };

  const confirmDelete = () => {};

  const onSubmit: SubmitHandler<FormDataBook> = (data) => {
    console.log("data->", data);
    if (editingBook) {
      <></>;
    } else {
      mutateCreateBook(data, {
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

  useEffect(() => {
    if (allAuthor) {
      const authors = allAuthor.map((author) => ({
        label: author.name,
        value: author.id,
      }));

      setAuthorOptions(authors);
    }
  }, [allAuthor]);

  useEffect(() => {
    if (allPublishers) {
      const publishers = allPublishers.map((publisher) => ({
        label: publisher.name,
        value: publisher.id,
      }));

      setPublisherOptions(publishers);
    }
  }, [allPublishers]);

  if (isLoading) return <div>Carregando...</div>;
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
          columns={columnsBooks(handleEditBooks, handleDeleteBooks)}
          data={allBooks?.content || []}
          borderless
        />

        {allBooks && (
          <Pagination
            totalPages={allBooks.totalPages}
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
        <ModalAddBooks
          open={openModal}
          setOpen={setOpenModal}
          form={form}
          handleFormSubmit={onSubmit}
          authorOptions={authorOptions}
          publisherOptions={publisherOptions}
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

export default Books;
