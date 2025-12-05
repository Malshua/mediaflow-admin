"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState, Table } from "@/components/elements";
import { TableSkeleton } from "@/components/skeletons";
import { GetStatusBadge } from "@/components/widgets";
import { useGetMediaPlans } from "@/hooks/mediaHooks";
import { moneyFormat, moneyFormat2 } from "@/utilities/helpers";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { MediaPlanDetailsModal } from "@/components/sections/media-plan";

const ActivityLogs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>();
  const limit = 20;

  const { data: mediaPlans, isLoading } = useGetMediaPlans({
    limit,
    page_no: currentPage,
  });

  const info = useMemo(() => {
    return mediaPlans?.data?.data;
  }, [mediaPlans]);

  console.log(info);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row: any) => "", {
      id: "title",
      header: () => <span>Campaign Name</span>,
      cell: (info: any) => {
        const value = info?.row?.original;

        return <div className="font-medium">{value?.campaignName}</div>;
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "status",
      header: () => <span>Approval Status</span>,
      cell: (info: any) => {
        const status = info?.row?.original;
        return (
          <div className={` py-1 px-2.5 text-white text-xs rounded w-fit`}>
            {<GetStatusBadge status={status?.adminApprovalStatus} />}
          </div>
        );
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "budget",
      header: () => <span>Budget</span>,
      cell: (info: any) => {
        const budget = info?.row?.original?.budget;
        return (
          <div className="font-medium">₦{moneyFormat(Number(budget))}</div>
        );
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (info: any) => {
        const data = info.row.original;
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setData(data);
                    setIsOpen(true);
                  }}
                >
                  View details
                </DropdownMenuItem>
                <div>
                  {" "}
                  <DropdownMenuItem>Reprompt media plan</DropdownMenuItem>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  Reject media plan
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          <div>
            <MediaPlanDetailsModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              data={data}
            />
          </div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : info?.mediaPlans?.length < 1 ? (
          <EmptyState />
        ) : (
          <Table
            columns={columns}
            data={info?.mediaPlans}
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

export default ActivityLogs;
