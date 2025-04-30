"use client";

import { Bunner } from "@/components/analytics/bunner";
import { SiteFooter } from "@/components/analytics/site-footer";
import { SiteNavbar } from "@/components/analytics/site-navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Enum_Routes } from "../../../../routes";
import { ModalLogin } from "./analytics/components/ModalLogin";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type loginType = z.infer<typeof formSchema>;

const SiteHome = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const form = useForm<loginType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<loginType> = (data) => {
    console.log("data->", data);
    router.push(Enum_Routes.BOOKS);
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <SiteNavbar setOpen={setOpenModal} />
      <Bunner />

      <div className="fixed bottom-0 w-full">
        <SiteFooter />
      </div>

      {openModal && (
        <ModalLogin
          open={openModal}
          setOpen={setOpenModal}
          form={form}
          handleFormSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default SiteHome;
