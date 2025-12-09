"use client";

import { EmptyState, ProgressBar, Table } from "@/components/elements";
import { CampaignDetailsModal } from "@/components/sections/campaigns";
import { TableSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetStatusBadge } from "@/components/widgets";
import { useGetCampaigns } from "@/hooks/campaignHooks";
import { moneyFormat } from "@/utilities/helpers";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import React, { useMemo, useState } from "react";

const Campaigns = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  const { data: campaigns, isLoading } = useGetCampaigns({
    limit,
    page_no: currentPage,
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
              onClick={() => {
                setData(campaignData);
                setIsOpen(true);
              }}
              className="text-[#A1238E] font-medium underline cursor-default hover:text-[#59044c]"
            >
              View Details
            </div>
          </>
        );
      },
    }),
  ];

  return (
    <section className="mx-auto sm:px-5 md:px-10 pb-5 xl:px-20 border-x border-[#E2E8F0] pt-14">
      <div className="bg-white p-5 shadow-sm rounded-lg mx-4 mt-10">
        <div className="flex items-center justify-between mb-5 md:px-4">
          <h1 className="font-bold text-lg md:text-xl text-gray-700">
            All Campaigns
          </h1>
          <div>
            <CampaignDetailsModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              data={data}
            />
          </div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : info?.campaigns?.length < 1 ? (
          <EmptyState />
        ) : (
          <div>
            <div className="hidden md:block">
              <Table
                columns={columns}
                data={info?.campaigns}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={info?.pagination?.totalPages}
                count={info?.pagination?.total}
              />
            </div>
            <div className="block md:hidden">
              {info?.campaigns.map((ro: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="border px-2 py-4 rounded-md flex items-start justify-between"
                  >
                    <div className="">
                      <div className="flex flex-col gap-1">
                        <div className="font-medium text-wrap">
                          {ro?.campaignName}
                        </div>

                        <div className="whitespace-nowrap capitalize text-green-800 font-medium">
                          {ro?.campaignType.replace(/_/g, " ")}
                        </div>

                        <div className="w-fit py-1 flex items-center gap-2 rounded-2xl capitalize">
                          ₦{moneyFormat(ro?.budget)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-10">
                      <>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setData(ro);
                                setIsOpen(true);
                              }}
                              className="text-[#A1238E] font-medium underline cursor-default hover:text-[#59044c]"
                            >
                              View details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                      <div className="pr-2">
                        {<GetStatusBadge status={ro?.status} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Campaigns;
