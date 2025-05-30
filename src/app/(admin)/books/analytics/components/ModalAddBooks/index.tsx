import { Modal } from "@/components/analytics/Modals/modalBase";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { InputForm } from "@/components/analytics/FormComponents/InputForm";
import { SelectForm } from "@/components/analytics/FormComponents/SelectForm";
import { TextareaForm } from "@/components/analytics/FormComponents/TextAreaForm";
import { genreList } from "@/utils/types/genre-list";
import { IOptions } from "@/utils/types/options";
import { FormDataBook } from "../../../page";

type ModalAddAuthorProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<FormDataBook, any, FormDataBook>;
  handleFormSubmit: SubmitHandler<FormDataBook>;
  authorOptions: IOptions[];
  publisherOptions: IOptions[];
};

export const ModalAddBooks = ({
  open,
  form,
  authorOptions,
  publisherOptions,
  setOpen,
  handleFormSubmit,
}: ModalAddAuthorProps) => {
  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title=""
      description="Adicione um novo livro"
    >
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <InputForm
                name="title"
                control={form.control}
                label="Título do livro"
                placeholder="Digite o nome"
              />

              <div className="w-full">
                <InputForm
                  name="isbn"
                  control={form.control}
                  label="ISBN"
                  placeholder="Digite o ISBN"
                />
              </div>

              <div className="w-full">
                <SelectForm
                  name="author_id"
                  label="Autor"
                  control={form.control}
                  placeholder="Selecionar"
                  options={authorOptions || []}
                />
              </div>

              <div className="flex items-start justify-between gap-5 w-full">
                <div className="w-full">
                  <InputForm
                    type="number"
                    name="price"
                    control={form.control}
                    label="Preço do livro"
                    placeholder="R$ 0.0"
                  />
                </div>

                <div className="w-full">
                  <InputForm
                    name="publicationDate"
                    control={form.control}
                    label="Data da publicação"
                    type="date"
                  />
                </div>
              </div>

              <div className="flex items-start gap-5 w-full">
                <div className="w-full">
                  <SelectForm
                    name="publisher_id"
                    label="Editora"
                    control={form.control}
                    placeholder="Selecionar"
                    options={publisherOptions || []}
                  />
                </div>

                <div className="w-full">
                  <SelectForm
                    name="genre"
                    label="Generos"
                    control={form.control}
                    placeholder="Selecionar"
                    options={genreList}
                  />
                </div>
              </div>

              <InputForm
                name="bookCoverUrl"
                control={form.control}
                label="Capa do livro (url)"
              />

              <div>
                <TextareaForm
                  name="comment"
                  label="Sinopse"
                  placeholder="Digite uma review para o livro"
                  control={form.control}
                  height={100}
                />
              </div>

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
