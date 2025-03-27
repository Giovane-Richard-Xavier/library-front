"use client";

import { Bunner } from "@/components/analytics/bunner";
import { SiteFooter } from "@/components/analytics/site-footer";
import { SiteNavbar } from "@/components/analytics/site-navbar";
import React from "react";

const SiteHome = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <SiteNavbar />
      <Bunner />

      <div className="fixed bottom-0 w-full">
        <SiteFooter />
      </div>
    </div>
  );
};

export default SiteHome;
