"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { media_logo } from "../../../public/images";
import { AdminRoutes } from "@/constants/AdminRoutes";
import { GoHome } from "react-icons/go";
import { BsUiChecksGrid } from "react-icons/bs";
import { IoLogoStackoverflow } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const logOut = () => {
    localStorage.removeItem("token");
    push(AdminRoutes.LOGIN);
  };

  const navRoutes = [
    {
      label: "Dashboard",
      link: AdminRoutes.DASHBOARD,
      icon: <GoHome className="h-4 w-4" />,
    },
    {
      label: "Campaigns",
      link: AdminRoutes.CAMPAIGNS,
      icon: <BsUiChecksGrid className="h-3 w-3" />,
    },
    {
      label: "Users",
      link: AdminRoutes.USERS,
      icon: <LuUsers />,
    },
    {
      label: "Media Plan",
      link: AdminRoutes.ACTIVITY_LOGS,
      icon: <IoLogoStackoverflow />,
    },
  ];

  return (
    <div className="hidden fixed w-full top-0 md:flex items-center justify-between border-b border-[#E2E8F0] px-8 py-3 bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-purple-800">
      <div className="flex items-center gap-32">
        <Image src={media_logo} alt="coceptual logo" width={37} height={32} />

        <ul className="flex items-center gap-2">
          {navRoutes?.map((route, index) => (
            <li
              key={index}
              className={`${
                pathname.includes(route?.link)
                  ? "bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-purple-800 rounded-md font-medium text-white"
                  : "text-white"
              } hover:text-amber-500 all__trans text-sm py-2 px-4 flex items-center gap-1`}
            >
              <span>{route?.icon}</span>
              <Link href={route?.link} className="p-1">
                {route?.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <div className="h-7 w-[1px] bg-[#E4E7EC]"></div>
        <div className="flex items-end" onClick={() => logOut()}>
          <MdLogout className="text-red-500 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
