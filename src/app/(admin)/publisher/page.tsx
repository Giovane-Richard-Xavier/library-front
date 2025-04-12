import React, { useState } from "react";
import { TypeOf, z } from "zod";

const formSchema = z.object({
  name: z.string().min(4, "Nome obrigatório"),
});

export type FormDataPublisher = z.infer<typeof formSchema>;

const Pubisher = () => {
  const [openModal, setOpentModal] = useState(false);
  const [openAlertModalDelete, setOpenAlertModalDelete] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState<any | null>(null);
  const [deletePublisher, setDeletePublisher] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("createdAt,desc");

  // MUTATIONS

  // QUERIES

  return <div>Pubisher</div>;
};

export default Pubisher;
