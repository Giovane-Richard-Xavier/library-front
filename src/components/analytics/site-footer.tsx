"use client";

import { IonIcon } from "@ionic/react";
import {
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoLinkedin,
  logoYoutube,
  logoTiktok,
} from "ionicons/icons";

import {
  ajuda,
  institucional,
  navegue_col_1,
  navegue_col_2,
  navegue_col_3,
} from "@/utils/links-footer";
import Link from "next/link";
import React from "react";

export const SiteFooter = () => {
  const socialMedia = [
    {
      title: "Facebook",
      icon: logoFacebook,
      href: "#",
    },
    {
      title: "Instagram",
      icon: logoInstagram,
      href: "#",
    },
    {
      title: "Twitter",
      icon: logoTwitter,
      href: "#",
    },
    {
      title: "Linkedin",
      icon: logoLinkedin,
      href: "#",
    },
    {
      title: "Youtube",
      icon: logoYoutube,
      href: "#",
    },
    {
      title: "Tiktok",
      icon: logoTiktok,
      href: "#",
    },
  ];

  return (
    <div className="flex items-center justify-center px-20 h-[37vh] w-full bg-gradient-to-r from-[#38184c] via-[#930648] to-[#38184c] text-white text-sm font-extralight p-10">
      <section className="grid grid-cols-3 gap-10 w-[70vw] h-full border-b border-white my-10">
        {/* area 1 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">Institucional</h1>
            {institucional.map((item) => (
              <div className="hover:underline" key={item.title}>
                <Link href={item.href}>{item.title}</Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="ttext-xl font-medium">Ajuda</h1>
            {ajuda.map((item) => (
              <div className="hover:underline" key={item.title}>
                <Link href={item.href}>{item.title}</Link>
              </div>
            ))}
          </div>
        </div>

        {/* area 2 */}
        <div className="flex flex-col items-start gap-2 text-nowrap">
          <h1 className="text-xl font-medium">Navegue pelo site</h1>

          <div className="grid grid-cols-3 gap-4w-[400px]">
            <div className="flex flex-col gap-2">
              {navegue_col_1.map((item) => (
                <div className="hover:underline" key={item.title}>
                  <Link href={item.href}>{item.title}</Link>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {navegue_col_2.map((item) => (
                <div className="hover:underline" key={item.title}>
                  <Link href={item.href}>{item.title}</Link>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {navegue_col_3.map((item) => (
                <div className="hover:underline" key={item.title}>
                  <Link href={item.href}>{item.title}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* area 3 */}
        <div className="flex flex-col items-start gap-5 text-nowrap w-[260px]">
          <h1 className="text-xl font-medium">Acompanhe as nossas redes</h1>
          <div className="flex items-start gap-5">
            {socialMedia.map((item) => (
              <Link key={item.title} href={item.href} title={item.title}>
                <IonIcon
                  icon={item.icon}
                  className="text-neutral-400 hover:text-neutral-200 cursor-pointer h-[22px] w-[22px]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
