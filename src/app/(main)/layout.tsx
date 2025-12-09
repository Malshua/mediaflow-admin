"use client";
import { Header } from "@/components/elements";
import { MobileNav } from "@/components/sections/navigation";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="bg-primary-soft h-screen">
        <div className="hidden md:block relative">
          <Header />
        </div>

        <MobileNav />

        <div className="overflow-x-hidden">
          <div className="py-5 md:p-0 h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
