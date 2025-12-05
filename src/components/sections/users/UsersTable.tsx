"use client";

import { EmptyState, Table } from "@/components/elements";
import { TableSkeleton } from "@/components/skeletons";
import { GetStatusBadge } from "@/components/widgets";
import { useGetUsers } from "@/hooks/userHooks";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import UserDetailsModal from "./UserDetailsModal";

const UsersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>();
  const limit = 20;

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
          <div
            onClick={() => {
              setData(data);
              setIsOpen(true);
            }}
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
            Our Users
          </h1>
          <div>
            <UserDetailsModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              data={data}
            />
          </div>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : info?.users?.length < 1 ? (
          <EmptyState />
        ) : (
          <Table
            columns={columns}
            data={info?.users}
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

export default UsersTable;
