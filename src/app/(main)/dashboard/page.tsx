"use client";

import { DashCards } from "@/components/elements";
import { RecentActivity } from "@/components/sections/dashboard";
import { StatCardSkeleton } from "@/components/skeletons";
import { AdminRoutes } from "@/constants/AdminRoutes";
import { useGetDashboard } from "@/hooks/dashboardHooks";
import Link from "next/link";
import React, { useMemo } from "react";
import { MdOutlineArrowForward } from "react-icons/md";

const Dashboard = () => {
  const { data: dashStats, isLoading } = useGetDashboard();

  const dash_stats = useMemo(() => {
    return dashStats?.data?.data;
  }, [dashStats]);

  const dashItems = [
    {
      title: "Total Campaigns",
      amount: dash_stats?.overview?.totalCampaigns,
    },
    {
      title: "Total Media Plans",
      amount: dash_stats?.overview?.totalMediaPlans,
    },
    {
      title: "Total Users",
      amount: dash_stats?.overview?.totalUsers,
    },
    {
      title: "Approved Media Plans",
      amount: dash_stats?.mediaPlansBreakdown?.approved,
    },
    {
      title: "Pending Media Plans",
      amount: dash_stats?.mediaPlansBreakdown?.pending,
    },
    {
      title: "Rejected Media Plans",
      amount: dash_stats?.mediaPlansBreakdown?.rejected,
    },
  ];

  return (
    <section className="mx-5 md:px-10 pb-5 xl:px-20 border-x border-[#E2E8F0] md:pt-14 mt-7">
      <>
        <div className="flex flex-col gap-8">
          <div className="mt-10">
            <h1 className="md:text-lg font-semibold">Welcome back, Admin!</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* {dashCards.map((item, i) => (
            <Card title={item.title} text={item?.text} key={i} />
          ))} */}
            <Link
              className="p-6 flex items-center border border-fuchsia-950 rounded-lg justify-between cursor-default"
              href={AdminRoutes?.CAMPAIGNS}
            >
              <div className="flex flex-col items-start gap-1">
                <h1 className="text-sm font-medium">View Campaigns</h1>
                <p className="text-xs">See available Campaigns</p>
              </div>
              <MdOutlineArrowForward />
            </Link>
            <Link
              href={AdminRoutes?.USERS}
              className="p-6 flex items-center border border-fuchsia-950  rounded-lg justify-between cursor-default"
            >
              <div className="flex flex-col items-start gap-1">
                <h1 className="text-sm font-medium">Current Clients</h1>
                <p className="text-xs">See active users</p>
              </div>
              <MdOutlineArrowForward />
            </Link>

            <Link
              href={AdminRoutes?.ACTIVITY_LOGS}
              className="p-6 flex items-center border border-fuchsia-950 rounded-lg justify-between cursor-default"
            >
              <div className="flex flex-col items-start gap-1">
                <h1 className="text-sm font-medium">Media Plans</h1>
                <p className="text-xs">View and edit Media Plans</p>
              </div>
              <MdOutlineArrowForward />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading
              ? [...Array(3)]?.map((_, index) => (
                  <StatCardSkeleton key={index} />
                ))
              : dashItems.map((dash, i) => (
                  <DashCards title={dash.title} amount={dash.amount} key={i} />
                ))}
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
