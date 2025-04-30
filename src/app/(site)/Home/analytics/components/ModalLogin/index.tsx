import { Modal } from "@/components/analytics/Modals/modalBase";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { InputForm } from "@/components/analytics/FormComponents/InputForm";

import { loginType } from "../../../page";

type ModalAddAuthorProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<loginType, any, loginType>;
  handleFormSubmit: SubmitHandler<loginType>;
};

export const ModalLogin = ({
  open,
  form,
  setOpen,
  handleFormSubmit,
}: ModalAddAuthorProps) => {
  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title="Entrar na área adminstrativa?"
      description=""
      width="w-80"
    >
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <InputForm
                name="email"
                control={form.control}
                label="E-mail"
                placeholder="Digite seu e-mail"
              />

              <div className="w-full">
                <InputForm
                  name="password"
                  control={form.control}
                  label="Senha"
                  placeholder="Digite sua senha"
                  type="password"
                />
              </div>

              <div className="flex items-center justify-between gap-2 mt-5">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="w-[120px]"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="w-[120px] bg-green-600 hover:bg-green-700"
                >
                  Entrar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
