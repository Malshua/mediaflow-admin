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
import { useApproveMediaPlan, useGetMediaPlans } from "@/hooks/mediaHooks";
import { moneyFormat, moneyFormat2 } from "@/utilities/helpers";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import {
  MediaPlanDetailsModal,
  RejectMediaPlan,
  RepromptMediaPlan,
} from "@/components/sections/media-plan";
import { useInvalidateMedia } from "@/hooks/invalidateHooks";
import { toast } from "react-toastify";

const ActivityLogs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openReprompt, setOpenReprompt] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>();
  const limit = 20;
  const { RefetchMediaPlan } = useInvalidateMedia();

  const { data: mediaPlans, isLoading } = useGetMediaPlans({
    limit,
    page_no: currentPage,
  });

  const { mutate: Approve } = useApproveMediaPlan({
    mediaPlanId: data?.mediaPlanId,
  });

  const handleApprove = () => {
    const payload: any = {};
    setIsApproving(true);
    Approve(payload, {
      onSuccess: (response) => {
        setIsApproving(false);
        toast?.success(response?.data?.message);
        RefetchMediaPlan();
      },
      onError: (error: any) => {
        setIsApproving(false);
        toast.error(error?.response?.data?.message);
      },
    });
  };

  const info = useMemo(() => {
    return mediaPlans?.data?.data;
  }, [mediaPlans]);

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
                <DropdownMenuItem
                  onClick={() => {
                    setData(data);
                    handleApprove();
                  }}
                  disabled
                >
                  Approve plan
                </DropdownMenuItem>
                <div>
                  {" "}
                  <DropdownMenuItem
                    onClick={() => {
                      setData(data);
                      setOpenReprompt(true);
                    }}
                  >
                    Reprompt media plan
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => {
                    setData(data);
                    setOpenReject(true);
                  }}
                >
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
    <section className="mx-auto sm:px-5 md:px-10 pb-5 xl:px-20 border-x border-[#E2E8F0] pt-7 md:mt-14">
      <div className="bg-white p-5 shadow-sm rounded-lg mx-4 mt-10">
        <div className="flex items-center justify-between mb-5 md:px-4">
          <h1 className="font-bold text-lg md:text-xl text-gray-700">
            Media Plans
          </h1>
          <div>
            <MediaPlanDetailsModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              data={data}
            />
            <RejectMediaPlan
              openModal={openReject}
              setOpenModal={setOpenReject}
              data={data}
            />
            <RepromptMediaPlan
              openModal={openReprompt}
              setOpenModal={setOpenReprompt}
              data={data}
            />
          </div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : info?.mediaPlans?.length < 1 ? (
          <EmptyState />
        ) : (
          <div>
            <div className="hidden md:block">
              <Table
                columns={columns}
                data={info?.mediaPlans}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={info?.pagination?.totalPages}
                count={info?.pagination?.total}
              />
            </div>
            <div className="block md:hidden">
              {info?.mediaPlans.map((ro: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="border px-2 py-4 rounded-md flex items-start justify-between"
                  >
                    <div className="">
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold text-lg">
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
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setData(ro);
                                handleApprove();
                              }}
                              disabled
                            >
                              Approve plan
                            </DropdownMenuItem>
                            <div>
                              {" "}
                              <DropdownMenuItem
                                onClick={() => {
                                  setData(ro);
                                  setOpenReprompt(true);
                                }}
                              >
                                Reprompt media plan
                              </DropdownMenuItem>
                            </div>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => {
                                setData(data);
                                setOpenReject(true);
                              }}
                            >
                              Reject media plan
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                      <div className="pr-2">
                        {
                          <GetStatusBadge
                            status={
                              ro?.adminApprovalStatus ? "active" : "inactive"
                            }
                          />
                        }
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

export default ActivityLogs;
