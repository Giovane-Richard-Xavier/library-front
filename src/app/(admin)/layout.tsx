import { AppSidebar } from "@/components/analytics/app-sidebar";
import { Navbar } from "@/components/analytics/navbar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr] w-full h-screen">
      {/* Sidebar */}
      <AppSidebar />

      {/* Navbar */}
      <div className="relative col-start-2 row-start-1 transition-all ease-in-out duration-200">
        <Navbar />
        <SidebarTrigger className="absolute top-1/4 left-1.5 z-50 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div
        className={`col-start-2 row-start-2 p-[2rem] pt-[1rem] overflow-x-hidden overflow-y-auto transition-all ease-in-out duration-200`}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
