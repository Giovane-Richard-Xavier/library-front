import { Modal } from "@/components/analytics/Modals/modalBase";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormDataAuthor } from "../../../page";
import { InputForm } from "@/components/analytics/FormComponents/InputForm";

type ModalAddAuthorProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<FormDataAuthor, any, FormDataAuthor>;
  handleFormSubmit: SubmitHandler<FormDataAuthor>;
};

export const ModalAddAuthor = ({
  open,
  setOpen,
  form,
  handleFormSubmit,
}: ModalAddAuthorProps) => {
  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title="Adicionar Autor"
      description="Adicione um novo autor"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <InputForm
                name="name"
                control={form.control}
                label="Nome completo"
                placeholder="Digite seu nome"
              />

              <InputForm
                name="nationality"
                control={form.control}
                label="Nacionalidade"
                placeholder="Digite sua nacionalidade"

                // mask="(99) 99999-9999"
              />

              <InputForm
                name="birthdate"
                control={form.control}
                label="Data de nascimento"
                placeholder="Digite sua data de nascimento"
                type="date"
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
