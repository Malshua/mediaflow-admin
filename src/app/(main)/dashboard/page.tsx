"use client";

import { DashCards } from "@/components/elements";
import { RecentActivity } from "@/components/sections/dashboard";
import { StatCardSkeleton } from "@/components/skeletons";
import { AdminRoutes } from "@/constants/AdminRoutes";
import { useGetDashboard } from "@/hooks/dashboardHooks";
import { useAuth } from "@/hooks/useAuthActions";
import Link from "next/link";
import { ImCancelCircle } from "react-icons/im";
import React, { useMemo } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoSettingsOutline, IoVideocam } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { GrInProgress } from "react-icons/gr";
import { MdCamera, MdOutlineArrowForward } from "react-icons/md";
import { FaChartBar, FaChartLine } from "react-icons/fa";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { CgMediaLive } from "react-icons/cg";
import { UsersTable } from "@/components/sections/users";

const Dashboard = () => {
  const { user } = useAuth();
  const { data: dashStats, isLoading } = useGetDashboard();

  const dash_stats = useMemo(() => {
    return dashStats?.data?.data;
  }, [dashStats]);

  const dashItems = [
    {
      title: "Total Campaigns",
      amount: dash_stats?.overview?.totalCampaigns,
      icon: <MdCamera className="text-[#7E00CC] text-xl" />,
      bg_color: "#FBF5FF",
    },
    {
      title: "Total Media Plans",
      amount: dash_stats?.overview?.totalMediaPlans,
      icon: <IoVideocam className="text-[#EE9659] text-xl" />,
      bg_color: "#FDF3ED",
    },
    {
      title: "Total Users",
      amount: dash_stats?.overview?.totalUsers,
      icon: <LuUsers className="text-[#D99BFF] text-xl" />,
      bg_color: "#FBF5FF",
    },
    {
      title: "Approved Media Plans",
      amount: dash_stats?.mediaPlansBreakdown?.approved,
      icon: <IoMdCheckmarkCircleOutline className="text-[#3CEC9A] text-xl" />,
      bg_color: "#ECFDF5",
    },
    {
      title: "Pending Media Plans",
      amount: dash_stats?.mediaPlansBreakdown?.pending,
      icon: <GrInProgress className="text-[#E6B800] text-xl" />,
      bg_color: "#FFF9E6",
    },
    {
      title: "Rejected Media Plans",
      amount: dash_stats?.mediaPlansBreakdown?.rejected,
      icon: <ImCancelCircle className="text-[#E5484D] text-xl" />,
      bg_color: "#FDECEC",
    },
  ];

  const LinkTags = [
    {
      title: "Campaigns",
      icon: <FaChartBar />,
      href: AdminRoutes?.CAMPAIGNS,
    },
    {
      title: "Clients",
      icon: <FaUsersBetweenLines />,
      href: AdminRoutes?.USERS,
    },
    {
      title: "Plans",
      icon: <CgMediaLive />,
      href: AdminRoutes?.MEDIA_PLANS,
    },
    {
      title: "Analytics",
      icon: <FaChartLine />,
      href: "",
    },
    {
      title: "Settings",
      icon: <IoSettingsOutline />,
      href: "",
    },
  ];

  return (
    <section className="mx-5 px-3 md:px-5 pb-5 xl:px-20 border-x border-[#E2E8F0] md:pt-14 mt-7">
      <>
        <div className="flex flex-col gap-8">
          <div className="mt-7">
            <h1 className="sm:text-xl font-bold">Admin Dashboard!</h1>
            <p className="text-xs sm:text-sm md:text-base">
              welcome back, {user?.email}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading
              ? [...Array(3)]?.map((_, index) => (
                  <StatCardSkeleton key={index} />
                ))
              : dashItems.map((dash, i) => (
                  <DashCards
                    title={dash.title}
                    amount={dash.amount}
                    icon={dash?.icon}
                    bg_color={dash?.bg_color}
                    key={i}
                  />
                ))}
          </div>

          <div className="flex items-center justify-evenly bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-purple-800 rounded py-2.5">
            {LinkTags.map((link: any, i: number) => (
              <Link
                href={link?.href}
                key={i}
                className="text-white flex items-center gap-2 hover:bg-gradient-to-tr hover:from-purple-950 hover:via-fuchsia-900 hover:to-purple-800 py-1.5 px-2 rounded-md font-medium"
              >
                <span>{link?.icon}</span>
                <span className="hidden sm:block text-sm">{link?.title}</span>
              </Link>
            ))}
          </div>

          <div>
            <UsersTable />
          </div>

          {/* Recent activity */}
          <div className="mb-10 bg-white rounded-xl shadow">
            <RecentActivity activities={dash_stats?.recentActivity} />
          </div>
        </div>
      </>
    </section>
  );
};

export default Dashboard;
