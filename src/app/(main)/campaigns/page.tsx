"use client";

import { EmptyState, ProgressBar, Table } from "@/components/elements";
import { CampaignDetailsModal } from "@/components/sections/campaigns";
import { TableSkeleton } from "@/components/skeletons";
import { useGetCampaigns } from "@/hooks/campaignHooks";
import { moneyFormat } from "@/utilities/helpers";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

const Campaigns = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  const { data: campaigns, isLoading } = useGetCampaigns({
    limit,
  });

  const info = useMemo(() => {
    return campaigns?.data?.data;
  }, [campaigns]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row: any) => row?.campaignName, {
      id: "campaign name",
      header: () => <span>Campaign Name</span>,
      cell: (info: any) => {
        const value = info?.row?.original;

        return <div>{value?.campaignName}</div>;
      },
    }),

    columnHelper.accessor((row: any) => row?.status, {
      id: "status",
      header: () => <span>Status</span>,
      cell: (info: any) => {
        const status = info?.row?.original?.status;
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
          >
            {status}
          </div>
        );
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "budget",
      header: () => <span>Budget</span>,
      cell: (info: any) => {
        const budget = info?.row?.original?.budget;
        return <div className="font-medium">₦{moneyFormat(budget)}</div>;
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "campaign type",
      header: () => <span>Campaign Type</span>,
      cell: (info: any) => {
        const value = info?.row?.original?.campaignType;
        return (
          <div>
            {value
              ?.replace(/_/g, " ")
              .replace(/\b\w/g, (c: any) => c.toUpperCase())}
          </div>
        );
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (info: any) => {
        const campaignData = info.row.original;
        return (
          <>
            <div
              onClick={() => setIsOpen(true)}
              className="text-[#A1238E] font-medium underline cursor-default hover:text-[#59044c]"
            >
              View Details
            </div>

            <CampaignDetailsModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              data={campaignData}
            />
          </>
        );
      },
    }),
  ];

  return (
    <section className="mx-auto px-10 pb-5 xl:px-20 border-x border-[#E2E8F0] pt-14">
      <div className="bg-white p-5 shadow-sm rounded-lg mx-4 mt-10">
        <div className="flex items-center justify-between mb-5 md:px-4">
          <h1 className="font-bold text-base md:text-lg text-gray-700">
            All Campaigns
          </h1>
          <div></div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : info?.length < 1 ? (
          <EmptyState />
        ) : (
          <Table
            columns={columns}
            data={info?.campaigns}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={info?.pagination?.totalPages}
            count={info?.pagination?.total}
          />
        )}
      </div>
    </section>
  );
};

export default Campaigns;
