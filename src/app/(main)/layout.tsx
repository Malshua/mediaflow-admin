"use client";
import { Header } from "@/components/elements";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="hidden md:block bg-primary-soft h-screen">
        <div className="hidden md:block relative">
          <Header />
        </div>

        <div className="overflow-x-hidden">
          <div className="py-5 md:p-0 h-screen">{children}</div>
        </div>
      </div>

      <div className="block md:hidden">PLEASE USE A DESKTOP DEVICE</div>
    </div>
  );
};

export default Layout;
