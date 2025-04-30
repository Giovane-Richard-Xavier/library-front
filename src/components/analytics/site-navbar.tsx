"use client";

import { IonIcon } from "@ionic/react";
import {
  cartOutline,
  heartOutline,
  logIn,
  peopleOutline,
  searchOutline,
  settings,
} from "ionicons/icons";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

type SiteNavbarProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SiteNavbar = ({ setOpen }: SiteNavbarProps) => {
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

        <div className="max-w-[400px] w-full relative">
          <Input
            className="w-full z-30 bg-white"
            placeholder="O que você está procurando?"
          />
          <Button
            variant="ghost"
            className="absolute right-0 top-0 w-10 h-full p-0 z-10"
          >
            <IonIcon
              icon={searchOutline}
              className="text-neutral-400 hover:text-neutral-700 cursor-pointer h-[22px] w-[22px]"
            />
          </Button>
        </div>

        {/* rightside */}
        <div className="flex items-center justify-between gap-4 max-w-[300px] w-full">
          <div className="flex items-center gap-2">
            <IonIcon
              icon={heartOutline}
              className="text-neutral-400 hover:text-neutral-100 cursor-pointer h-[22px] w-[22px]"
            />
            Minhas listas
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-transparent cursor-pointer outline-none">
                  <IonIcon
                    icon={peopleOutline}
                    className="text-neutral-400 hover:text-neutral-100 cursor-pointer h-[22px] w-[22px]"
                  />
                  Entrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuItem
                  className="gap-5"
                  onClick={() => setOpen(true)}
                >
                  <IonIcon size="small" icon={logIn} />
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-5">
                  <IonIcon size="small" icon={settings} />
                  Minha conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <IonIcon
              icon={cartOutline}
              className="text-neutral-400 hover:text-neutral-100 cursor-pointer h-[22px] w-[22px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
