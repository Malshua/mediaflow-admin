"use client";

import { EmptyState } from "@/components/elements";
import { DDMMYYTime } from "@/utilities/helpers";
import React from "react";

const RecentActivity = ({ activities }: any) => {
  return (
    <div>
      <div className="py-4 px-4 md:px-6 text-sm font-semibold">
        Recent Activity
      </div>

      {activities?.length < 1 ? (
        <EmptyState />
      ) : (
        activities?.map((item: any, i: number) => (
          <div
            key={i}
            className="py-4 px-4 md:px-6 text-sm border-t border-[#EDF2F7] flex justify-between"
          >
            <div className="flex-1 mr-4">{item?.title}</div>

            <div className="font-semibold">
              {DDMMYYTime(item.createdAt).Date},{" "}
              {DDMMYYTime(item.createdAt).Time}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentActivity;
