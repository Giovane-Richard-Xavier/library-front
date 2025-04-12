import { Modal } from "@/components/analytics/Modals/modalBase";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { InputForm } from "@/components/analytics/FormComponents/InputForm";
import { FormDataPublisher } from "../../../page";

type ModalAddPublisherProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<FormDataPublisher, any, FormDataPublisher>;
  handleFormSubmit: SubmitHandler<FormDataPublisher>;
};

export const ModalAddPublisher = ({
  open,
  setOpen,
  form,
  handleFormSubmit,
}: ModalAddPublisherProps) => {
  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title="Adicionar Editora"
      description="Adicione uma nova Editora"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <InputForm
                name="name"
                control={form.control}
                label="Nome da editora"
                placeholder="Digite seu nome"
              />

              <div className="flex items-center justify-end gap-2 mt-5">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
