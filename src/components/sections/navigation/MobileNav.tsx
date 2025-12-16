"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { ReactNode, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Link from "next/link";
import { AdminRoutes } from "@/constants/AdminRoutes";
import { GoHome } from "react-icons/go";
import { BsUiChecksGrid } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { IoLogoStackoverflow, IoNotificationsOutline } from "react-icons/io5";
import { media_logo } from "../../../../public/images";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";

interface NavLinksProps {
  item: {
    icon: ReactNode;
    label: string;
    link: string;
  };
  closeNav: any;
}

const NavLinks = [
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
    link: AdminRoutes.MEDIA_PLANS,
    icon: <IoLogoStackoverflow />,
  },
  {
    label: "LogOut",
    link: AdminRoutes.LOGOUT,
    icon: <CiLogout className="text-red-500" />,
  },
];

const Navitem = ({ item, closeNav }: NavLinksProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="flex flex-col gap-2 font-normal text-sm">
      <Link
        href={item?.link}
        onClick={closeNav}
        className={`flex items-center gap-2 py-2.5 px-2 rounded-sm font-medium text-sm all__trans ${
          pathname.includes(item.link)
            ? "bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-purple-800 text-white"
            : "text-[#334155]"
        }`}
      >
        <div>{item.icon}</div>
        <span className="all_trans">{item.label}</span>
      </Link>
    </li>
  );
};

const MobileNavBody = ({ mobileNavOpen, setMobileNavOpen }: any) => {
  const closeNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <>
      <div
        className={`z-50 flex flex-col fixed top-0 left-0 bottom-0 h-full bg-white p-4 w-80 sm:w-96 transition-all ease-in-out duration-300 overflow-y-auto scrollbar-hidden ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="p-2 flex items-center gap-2">
            <div className="h-14 w-14">
              <Image
                className="h-14 w-14 object-cover"
                src={media_logo}
                alt="profile photo"
                height={25}
                width={30}
                priority
              />
            </div>
          </div>

          <button
            onClick={closeNav}
            className="block w-fit ml-auto text-2xl text-primary-default cursor-pointer"
          >
            <IoMdCloseCircle />
          </button>
        </div>

        {/* links */}

        <ul className="flex flex-col gap-2 mt-7">
          {NavLinks.map((item, index) => (
            <Navitem item={item} closeNav={closeNav} key={index} />
          ))}
        </ul>
      </div>

      {mobileNavOpen && (
        <div
          onClick={closeNav}
          className="h-full w-full z-40 bg-[#27272E]/50 fixed top-0 left-0 bottom-0"
        ></div>
      )}
    </>
  );
};

const MobileNav = () => {
  const pathname = usePathname();
  const firstRoute = pathname.split("/")[1] || "";

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="block md:hidden ">
      <div className="fixed top-0 left-0 right-0 py-3 px-6 text-white bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-purple-800 flex items-center justify-between shadow-sm border-b">
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileNavOpen(true)}>
            <GiHamburgerMenu className="text-2xl" />
          </button>

          <p className="capitalize text-lg font-medium">{firstRoute}</p>
        </div>

        <div className="text-2xl text-primary-default relative inline-flex">
          <IoNotificationsOutline className="" />
        </div>
      </div>

      <MobileNavBody
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />
    </div>
  );
};

export default MobileNav;
