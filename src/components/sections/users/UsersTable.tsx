"use client";

import {
  EmptyState,
  SearchWidget,
  StatusSelect,
  Table,
} from "@/components/elements";
import { TableSkeleton } from "@/components/skeletons";
import { GetStatusBadge } from "@/components/widgets";
import { useGetUsers } from "@/hooks/userHooks";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import UserDetailsModal from "./UserDetailsModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { GoPlusCircle } from "react-icons/go";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminRoutes } from "@/constants/AdminRoutes";

const UsersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>();
  const pathname = usePathname();
  const firstRoute = pathname.split("/")[1] || "";
  const limit = 20;

  const { watch, control } = useForm();
  const watched = watch("status")?.value;

  const Correct = firstRoute === "users";

  const { data: users, isLoading } = useGetUsers({
    limit,
    page_no: currentPage,
  });

  const info = useMemo(() => {
    return users?.data?.data;
  }, [users]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row: any) => "", {
      id: "name",
      header: () => <span>Name</span>,
      cell: (info: any) => {
        const value = info?.row?.original;

        return <div className="font-medium">{value?.fullName}</div>;
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "acct status",
      header: () => <span>Acct Status</span>,
      cell: (info: any) => {
        const status = info?.row?.original?.detailsSubmitted;
        return (
          <div className={`py-1 px-2.5 text-white text-xs rounded w-fit`}>
            {<GetStatusBadge status={status ? "active" : "inactive"} />}
          </div>
        );
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "email",
      header: () => <span>Email</span>,
      cell: (info: any) => {
        const email = info?.row?.original?.email;
        return <div className="font-medium">{email}</div>;
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "industry",
      header: () => <span>industry</span>,
      cell: (info: any) => {
        const value = info?.row?.original;
        return <div>{value?.industry}</div>;
      },
    }),

    columnHelper.accessor((row: any) => "", {
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (info: any) => {
        const data = info.row.original;
        return (
          <Link
            href={`${AdminRoutes?.USERS}/${data?.id}`}
            className="text-[#A1238E] font-medium underline cursor-default hover:text-[#59044c]"
          >
            View Details
          </Link>
        );
      },
    }),
  ];

  return (
    <section
      className={`mx-auto ${
        Correct
          ? "sm:px-5 md:px-10 xl:px-20 border-x border-[#E2E8F0] pt-7 md:mt-14"
          : ""
      } pb-5 `}
    >
      <div
        className={`bg-white ${
          Correct ? "p-5 mx-4 mt-10 shadow-sm rounded-lg" : ""
        }  `}
      >
        <div className={`flex flex-col ${Correct ? "mb-5 md:px-4" : ""}`}>
          <h1 className="font-bold text-lg md:text-xl text-gray-700">
            User Management
          </h1>
          <p className="text-[10px] sm:text-sm">
            Manage users, view profiles and perform administrative actions
          </p>
          <div>
            <UserDetailsModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              data={data}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-3">
          <div className="flex items-center py-4 w-full md:w-[50%]">
            <SearchWidget
              placeholder="Search users by email or name.."
              searchText={searchValue}
              setSearchText={setSearchValue}
            />
          </div>

          <div className="text-xs font-medium p-1 border-dashed border rounded w-fit flex items-center gap-3">
            <div className="sm:w-40">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <StatusSelect
                    options={[]}
                    leftIcon={<GoPlusCircle />}
                    icon={3}
                    placeholder="Status"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div></div>
        {isLoading ? (
          <TableSkeleton />
        ) : info?.users?.length < 1 ? (
          <EmptyState />
        ) : (
          <div>
            <div className="hidden md:block">
              <Table
                columns={columns}
                data={info?.users}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={info?.pagination?.totalPages}
                count={info?.pagination?.total}
              />
            </div>
            <div className="block md:hidden">
              {info?.users.map((ro: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="border px-2 py-4 rounded-md flex items-start justify-between"
                  >
                    <div className="">
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold text-lg">
                          {ro?.fullName}
                        </div>

                        <div className="whitespace-nowrap capitalize text-xs sm:text-sm font-medium">
                          {ro?.email}
                        </div>

                        <div className="w-fit py-1 flex items-center gap-2 text-xs sm:text-sm rounded-2xl font-medium capitalize">
                          Industry: {ro?.industry}
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
                        {
                          <GetStatusBadge
                            status={
                              ro?.detailsSubmitted ? "active" : "inactive"
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

export default UsersTable;
