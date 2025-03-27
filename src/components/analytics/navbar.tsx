import Image from "next/image";
import React from "react";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-20 h-[70px] bg-gradient-to-r from-[#38184c] via-[#930648] to-[#38184c] text-white">
      {/* leftside */}
      <div className="flex items-center gap-4">
        <Image src="/images/logo-book.png" alt="logo" height={30} width={50} />
        <h1 className="text-2xl font-extralight">Folhas Soltas</h1>
      </div>
    </div>
  );
};
