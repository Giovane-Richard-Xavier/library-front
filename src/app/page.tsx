"use client";

import SiteHome from "./(site)/Home/page";

export default function Home() {
  return (
    <div className="flex w-screen min-h-screen">
      {/* <div className="flex flex-col items-center justify-center gap-10 h-full w-full">
        <h1 className="text-2xl font-bold">ÁREA ADMINISTRATIVA</h1>
        <Button
          className="w-50 cursor-pointer bg-gradient-to-r from-[#38184c] via-[#930648] to-[#38184c]"
          onClick={() => router.push(Enum_Routes.AUTHORS)}
        >
          Entrar
        </Button>
      </div> */}
      <SiteHome />
    </div>
  );
}
