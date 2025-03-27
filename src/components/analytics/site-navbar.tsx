"use client";

import { IonIcon } from "@ionic/react";
import { cartOutline, heartOutline, peopleOutline } from "ionicons/icons";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Enum_Routes } from "../../../routes";

export const SiteNavbar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center px-20 h-[70px] w-full bg-gradient-to-r from-[#38184c] via-[#930648] to-[#38184c] text-white">
      {/* leftside */}
      <section className="flex items-center justify-between gap-4 w-[70vw]">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo-book.png"
            alt="logo"
            height={30}
            width={50}
          />
          <h1 className="text-2xl font-extralight">Folhas Soltas</h1>
        </div>

        <div className="max-w-[400px] w-full">
          <Input className="w-full" placeholder="O que você está procurando?" />
        </div>

        {/* rightside */}
        <div className="flex items-center justify-between gap-4 max-w-[300px] w-full">
          <div className="flex items-center gap-2">
            <IonIcon
              //   size="large"
              icon={heartOutline}
              className="text-neutral-400 hover:text-neutral-100 cursor-pointer h-[22px] w-[22px]"
            />
            Minhas listas
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => router.push(Enum_Routes.AUTHORS)}>
              <IonIcon
                //   size="large"
                icon={peopleOutline}
                className="text-neutral-400 hover:text-neutral-100 cursor-pointer h-[22px] w-[22px]"
              />
              Entrar
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <IonIcon
              //   size="large"
              icon={cartOutline}
              className="text-neutral-400 hover:text-neutral-100 cursor-pointer h-[22px] w-[22px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
