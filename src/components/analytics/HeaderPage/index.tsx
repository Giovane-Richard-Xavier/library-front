import { UseFormReturn } from "react-hook-form";

type HeaderPageProps = {
  title: string;
  textButton: string;
  setOpenModal: (open: boolean) => void;
  form: UseFormReturn<any, any, any>;
};

export const HeaderPage = ({
  setOpenModal,
  form,
  title,
  textButton,
}: HeaderPageProps) => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-5 border border-neutral-200 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer"
        onClick={() => {
          setOpenModal(true);
          form.reset();
        }}
      >
        {textButton}
      </button>
    </div>
  );
};
