"use client";

import { EmptyState, Table } from "@/components/elements";
import { TableSkeleton } from "@/components/skeletons";
import { useGetMediaPlans } from "@/hooks/mediaHooks";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const ActivityLogs = () => {
  const { data: mediaPlans, isLoading } = useGetMediaPlans({});

  const info = ["1"];

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row: any) => "", {
      id: "title",
      header: () => <span>Title</span>,
      cell: (info: any) => {
        const value = info?.row?.original;

        return <div></div>;
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "status",
      header: () => <span>Status</span>,
      cell: (info: any) => {
        const status = info?.getValue();
        return (
          <div
            className={`${
              status == "active"
                ? "bg-green-500"
                : status == "pending"
                ? "bg-amber-300"
                : status == "completed"
                ? "bg-red-500"
                : ""
            } py-1 px-2.5 text-white text-xs rounded w-fit`}
          ></div>
        );
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "budget",
      header: () => <span>Budget</span>,
      cell: (info: any) => {
        const budget = info?.getValue();
        return <div className="font-medium">₦</div>;
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "performance",
      header: () => <span>Performance</span>,
      cell: (info: any) => {
        const value = info?.getValue();
        return <div>{/* <ProgressBar value={value} /> */}</div>;
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (info: any) => {
        const value = info.row.original;
        return (
          <div
            // href={`${Routes?.CAMPAIGNS}/${value?.id}`}
            className="text-[#A1238E] font-medium underline cursor-default hover:text-[#59044c]"
          >
            View Details
          </div>
        );
      },
    }),
  ];

  return (
    <section className="mx-auto px-10 pb-5 xl:px-20 border-x border-[#E2E8F0] pt-14">
      <div className="bg-white p-5 shadow-sm rounded-lg mx-4 mt-10">
        <div className="flex items-center justify-between mb-5 md:px-4">
          <h1 className="font-bold text-base md:text-lg text-gray-700">
            Media Plans
          </h1>
          <div></div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : info?.length < 1 ? (
          <EmptyState />
        ) : (
          <Table columns={columns} data={[]} />
        )}
      </div>
    </section>
  );
};

export default ActivityLogs;
